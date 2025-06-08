import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistorialComentarioService } from './historial-comentario.service';
import { CreateHistorialComentarioDto } from './dto/create-historial-comentario.dto';
import { UpdateHistorialComentarioDto } from './dto/update-historial-comentario.dto';

@Controller('historial-comentario')
export class HistorialComentarioController {
  constructor(private readonly historialComentarioService: HistorialComentarioService) {}

  @Post()
  create(@Body() createHistorialComentarioDto: CreateHistorialComentarioDto) {
    return this.historialComentarioService.create(createHistorialComentarioDto);
  }

  @Get()
  findAll() {
    return this.historialComentarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historialComentarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistorialComentarioDto: UpdateHistorialComentarioDto) {
    return this.historialComentarioService.update(+id, updateHistorialComentarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historialComentarioService.remove(+id);
  }
}
