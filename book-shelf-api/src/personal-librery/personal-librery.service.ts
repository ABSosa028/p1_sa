import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonalLibreryDto } from './dto/create-personal-librery.dto';
import { UpdatePersonalLibreryDto } from './dto/update-personal-librery.dto';
import { PersonalLibrery } from './entities/personal-librery.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { BookService } from 'src/book/book.service';
import { Libro } from 'src/book/entities/book.entity';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Injectable()
export class PersonalLibreryService {

  constructor(
    @InjectRepository(PersonalLibrery)
    private readonly personalLibreryRepository: Repository<PersonalLibrery>,
    private readonly bookService: BookService,

  ) {

  }
  async create(createPersonalLibreryDto: CreatePersonalLibreryDto, user: User) {
    const libros = await this.bookService.searchBooks(createPersonalLibreryDto.librosIds);

    const newLibrery = this.personalLibreryRepository.create({
      usuario: user,
      libros: libros,
      estadoLectura: createPersonalLibreryDto.estadoLectura || 'pendiente',
      notas: createPersonalLibreryDto.notas || undefined,
    });

    return this.personalLibreryRepository.save(newLibrery);
  }

  findAll() {
    return `This action returns all personalLibrery`;
  }

  findOne(id: number) {
    return `This action returns a #${id} personalLibrery`;
  }

  update(id: number, updatePersonalLibreryDto: UpdatePersonalLibreryDto) {
    return `This action updates a #${id} personalLibrery`;
  }

  remove(id: number) {
    return `This action removes a #${id} personalLibrery`;
  }

  private handleDBEerrors(error: any): never {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);
    console.log(error)
    throw new BadRequestException('Check server logs for more details');
  }


  async getPersonalbyUser(userId: string) {
   const biblioteca = await this.personalLibreryRepository.findOne({
    where: { usuario: { id: userId } },
    relations: ['libros'],
  });

  if (!biblioteca) {
    throw new NotFoundException('Biblioteca personal no encontrada');
  }

  return biblioteca;
  }

  async addBooksToLibrary(librosIds: string[], user: string) {
    const biblioteca = await this.personalLibreryRepository.findOne({
      where: { usuario: { id: user } },
      relations: ['libros'],
    });

    if (!biblioteca) {
      throw new NotFoundException('Biblioteca personal no encontrada');
    }

    const nuevosLibros = await this.bookService.searchBooks(librosIds)

    const librosExistentesIds = biblioteca.libros.map(libro => libro.id);
    const librosAAgregar = nuevosLibros.filter(libro => !librosExistentesIds.includes(libro.id));

    biblioteca.libros.push(...librosAAgregar);

    await this.personalLibreryRepository.save(biblioteca);
  }
}
