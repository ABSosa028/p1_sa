import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Collection } from './entities/collection.entity';
import { In, IsNull, Not, Repository } from 'typeorm';
import { BookService } from 'src/book/book.service';
import { User } from 'src/auth/entities/user.entity';
import { AddBooksDto } from './dto/add-books.dto';
import { ShareCollectionDto } from './dto/share-collection.dto';

@Injectable()
export class CollectionService {

  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,
    private readonly bookService: BookService,

    @InjectRepository(User)
    private readonly userReposiyory: Repository<User>
  ) { }

  async create(createCollectionDto: CreateCollectionDto, user: User) {
    const collection = this.collectionRepository.create({
      ...createCollectionDto,
      usuario: user,
    });

    return await this.collectionRepository.save(collection);
  }

  async addedBooks(collectionId: string, dto: AddBooksDto) {
    const collection = await this.collectionRepository.findOne({
      where: { id: collectionId },
      relations: ['libros'],
    });

    const libros = await this.bookService.searchBooks(dto.libroIds);
    if (!collection) {
      throw new Error(`Collection with id ${collectionId} not found`);
    }
    collection.libros = [...collection.libros, ...libros];

    return await this.collectionRepository.save(collection);
  }

  async getBooksInCollection(collectionId: string) {
    const collection = await this.collectionRepository.findOne({
      where: { id: collectionId },
      relations: ['libros'],
    });

    if (!collection) throw new NotFoundException('Colección no encontrada');
    return collection.libros;
  }


  async remove(collectionId: string) {
    const collection = await this.collectionRepository.findOneBy({ id: collectionId });
    if (!collection) throw new NotFoundException('Colección no encontrada');

    return "Colección eliminada correctamente";
  }

  async shareCollection(collectionId: string, dto: ShareCollectionDto) {
    const collection = await this.collectionRepository.findOne({
      where: { id: collectionId },
      relations: ['usuariosCompartidos'],
    });

    if (!collection) {
      throw new NotFoundException('Colección no encontrada');
    }

    const users = await this.userReposiyory.findBy({
      id: In(dto.userIds),
    });

    collection.usuariosCompartidos = [...(collection.usuariosCompartidos || []), ...users];

    return this.collectionRepository.save(collection);
  }

  async shareCollections(userId: string) {
    return await this.collectionRepository
      .createQueryBuilder('collection')
      .innerJoin(
        'coleccion_usuarios_compartidos', 
        'shared', 
        'shared.coleccion_id = collection.id'
      )
      .where('collection.usuarioId = :userId', { userId })
      .getMany();
  }

}
