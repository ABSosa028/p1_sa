import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata, UseGuards, ParseUUIDPipe, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from 'src/auth/guards/user-role/user-role.guard';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) { }


  @SetMetadata('roles', ['user', 'admin'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  @Post()
  create(@Body() createBookDto: CreateBookDto,
    @GetUser() user: User,) {
    return this.bookService.create(createBookDto, user);
  }

  @SetMetadata('roles', ['user', 'admin'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookService.remove(id);
  }

  @SetMetadata('roles', ['user', 'admin'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  @Get()
  findAll() {

    return this.bookService.findAll();
  }

  @SetMetadata('roles', ['user', 'admin'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  @Get('search/:term')
  findOne(@Param('term') term: string) {
    return this.bookService.findOne(term);
  }

  @SetMetadata('roles', ['user', 'admin'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @SetMetadata('roles', ['user', 'admin'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  @Get('books-read')
  listReadBook(@Query('isNotRead') isNotRead: boolean = false) {
    return this.bookService.listReadBook(isNotRead);
  }

  @SetMetadata('roles', ['user', 'admin'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  @Get('books-by-genre')
  listBooksByGenre(@Query('genre') genre: string) {
    return this.bookService.listBooksByGenre(genre);
  }

  @SetMetadata('roles', ['user', 'admin'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  @Post('comentario/:id')
  addComment(@Param('id', ParseUUIDPipe) id: string, @Body() body: { comentario: string }, @GetUser() user: User) {
    return this.bookService.crearComentario(id, user, body.comentario);
  }

  
  @SetMetadata('roles', ['user', 'admin'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  @Get('get-coments/:idBook')
  getComentsforBook(@Param('idBook', ParseUUIDPipe) id: string) {
    return this.bookService.obtenerComentarios(id);
  }


  @SetMetadata('roles', ['user', 'admin'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  @Post('reaccion/:id')
  addReaction(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User) {
    return this.bookService.reaccionar(id, user);
  }

  @SetMetadata('roles', ['user', 'admin'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  @Get('reacciones/:idBook')
  getReactionsForBook(@Param('idBook', ParseUUIDPipe) id: string) {
    return this.bookService.contarReacciones(id);
  }

}
