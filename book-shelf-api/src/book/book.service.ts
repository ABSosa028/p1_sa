import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Libro } from './entities/book.entity';
import { In, Repository } from 'typeorm';

import { validate as IsUUID } from 'uuid'
import { ComentarioLibro } from './entities/comentario-libro.entity';
import { ReaccionLibro } from './entities/reaccion-libro.entity';

@Injectable()
export class BookService {

  constructor(
    @InjectRepository(Libro) 
    private readonly bookRepository: Repository<Libro>,

    @InjectRepository(ComentarioLibro) 
    private comentarioRepo: Repository<ComentarioLibro>,

    @InjectRepository(ReaccionLibro)
    private reaccionRepo: Repository<ReaccionLibro>,

  ) { }

  async create(createBookDto: CreateBookDto, user: User) {
    try {
      const book = createBookDto
      const newBook = this.bookRepository.create({
        ...book,
        usuario: user,
      });
      await this.bookRepository.save(newBook);
      return {
        ...newBook,
        message: 'Book created successfully',
      };
    } catch (error) {
      this.handleDBEerrors(error);
      
    }
  }


  async findOne(term: string) {
    let book: Libro | null = null;

    if (IsUUID(term)) {
      book = await this.bookRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.bookRepository.createQueryBuilder();
      book = await queryBuilder
        .where('LOWER(titulo) = :titulo OR LOWER(autor) = :autor', {
          titulo: term.toLowerCase(),
          autor: term.toLowerCase(),
        })
        .orWhere('LOWER(genero) = :genero', { genero: term.toLowerCase() })
        .getOne();
    }

    if (!book)
      throw new BadRequestException(`Book with id ${term} not found`);
    return book;

  }


  async remove(id: string) {
    const book = await this.findOne(id);
    await this.bookRepository.remove(book);
    return {
      message: `Book with id ${id} removed successfully`,
    };
  }

  private handleDBEerrors(error: any): never {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);
    console.log(error)
    throw new BadRequestException('Check server logs for more details');
  }


  async findAll() {
    const books = await this.bookRepository.find({
      relations: {
        usuario: true,
        
        colecciones: true,
      },
    });
    return books;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.preload({
      id,
      ...updateBookDto,
    });

    if (!book) throw new BadRequestException(`Book with id ${id} not found`);

    try {
      await this.bookRepository.save(book);
      return book
    } catch (error) {
      this.handleDBEerrors(error);
      // throw new BadRequestException('Check server logs for more details');
    }
  }

  async listReadBook(isNotRead: boolean = false) {
    const books = await this.bookRepository.find({
      where: {
        isRead: isNotRead,
      }
    });
    if (books.length === 0) {
      throw new BadRequestException('No books found');
    }
    return books;
  }

  async listBooksByGenre(genre: string) {
    const books = await this.bookRepository.find({
      where: {
        genero: genre,
      }
    });
    if (books.length === 0) {
      throw new BadRequestException(`No books found for genre ${genre}`);
    }
    return books;
  }

  async searchBooks (librosIds: string[]) {
    return this.bookRepository.find({
    where: { id: In(librosIds) }
  });
  }


  async crearComentario(libroId: string, usuario: User, comentario: string) {
    const libro = await this.bookRepository.findOneBy({ id: libroId });
    if (!libro) throw new NotFoundException('Libro no encontrado');

    return this.comentarioRepo.save({
      comentario,
      libro,
      usuario,
    });
  }

  async obtenerComentarios(libroId: string) {
    return this.comentarioRepo.find({
      where: { libro: { id: libroId } },
      relations: ['usuario'],
      order: { created_at: 'DESC' },
    });
  }

  async reaccionar(libroId: string, usuario: User) {
    const libro = await this.bookRepository.findOneBy({ id: libroId });
    if (!libro) throw new NotFoundException('Libro no encontrado');

    const existente = await this.reaccionRepo.findOne({ where: { libro: { id: libroId }, usuario: { id: usuario.id } } });
    if (existente) throw new BadRequestException('Ya reaccionaste a este libro');

    return this.reaccionRepo.save({
      libro,
      usuario,
      tipo: 'like',
    });
  }


  async contarReacciones(libroId: string) {
    return this.reaccionRepo.count({ where: { libro: { id: libroId } } });
  }

}
