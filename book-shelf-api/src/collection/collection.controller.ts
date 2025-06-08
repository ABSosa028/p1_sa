import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata, UseGuards, HttpCode } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from 'src/auth/guards/user-role/user-role.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { AddBooksDto } from './dto/add-books.dto';
import { ShareCollectionDto } from './dto/share-collection.dto';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) { }

  @SetMetadata('roles', ['user', 'admin'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  @Post()
  create(@Body() createCollectionDto: CreateCollectionDto, @GetUser() user: User) {
    return this.collectionService.create(createCollectionDto, user);
  }

  @SetMetadata('roles', ['user', 'admin'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  @Post('add-book-collection/:collectionId')
  addBookCollection(@Param('collectionId') collectionId: string, @Body() dto: AddBooksDto) {
    return this.collectionService.addedBooks(collectionId, dto);
  }

  @SetMetadata('roles', ['user', 'admin'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  @Get(':id/books')
  findCollection(@Param('collectionId') collectionId: string) {
    return this.collectionService.getBooksInCollection(collectionId);
  }


  @Delete(':collectionId')
  remove(@Param('collectionId') collectionId: string) {
    return this.collectionService.remove(collectionId);
  }


  @SetMetadata('roles', ['user', 'admin'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  @Post(':id/compartir')
  shareCollection(
    @Param('id') id: string,
    @Body() dto: ShareCollectionDto,
  ) {
    return this.collectionService.shareCollection(id, dto);
  }

  @SetMetadata('roles', ['user', 'admin'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  @Get('shared')
    sharedByme(@GetUser() user: User) {
    return this.collectionService.shareCollections(user.id);
  }

}
