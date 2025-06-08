import { Injectable } from '@nestjs/common';
import { CreateHistorialComentarioDto } from './dto/create-historial-comentario.dto';
import { UpdateHistorialComentarioDto } from './dto/update-historial-comentario.dto';

@Injectable()
export class HistorialComentarioService {
  create(createHistorialComentarioDto: CreateHistorialComentarioDto) {
    return 'This action adds a new historialComentario';
  }

  findAll() {
    return `This action returns all historialComentario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historialComentario`;
  }

  update(id: number, updateHistorialComentarioDto: UpdateHistorialComentarioDto) {
    return `This action updates a #${id} historialComentario`;
  }

  remove(id: number) {
    return `This action removes a #${id} historialComentario`;
  }
}
