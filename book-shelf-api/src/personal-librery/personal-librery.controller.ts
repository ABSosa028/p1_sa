import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata, UseGuards } from '@nestjs/common';
import { PersonalLibreryService } from './personal-librery.service';
import { CreatePersonalLibreryDto } from './dto/create-personal-librery.dto';
import { UpdatePersonalLibreryDto } from './dto/update-personal-librery.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from 'src/auth/guards/user-role/user-role.guard';


@Controller('personal-librery')
export class PersonalLibreryController {
  constructor(private readonly personalLibreryService: PersonalLibreryService) { }

  @SetMetadata('roles', ['user', 'admin'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  @Post()
  create(@Body() createPersonalLibreryDto: CreatePersonalLibreryDto,
    @GetUser() user: User,
  ) {
    return this.personalLibreryService.create(createPersonalLibreryDto, user);
  }

  @SetMetadata('roles', ['user', 'admin'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  @Get('get-personal-by-user')
  getPersonalbyUser(@GetUser() user: User,) {
    return this.personalLibreryService.getPersonalbyUser(user.id);
   
  }

  @SetMetadata('roles', ['user', 'admin'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  @Patch()
  update(@Body() updatePersonalLibreryDto: UpdatePersonalLibreryDto, @GetUser() user: User) {
    return this.personalLibreryService.addBooksToLibrary(updatePersonalLibreryDto.librosIds!, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personalLibreryService.remove(+id);
  }
}
