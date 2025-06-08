import { Module } from '@nestjs/common';
import { HistorialComentarioService } from './historial-comentario.service';
import { HistorialComentarioController } from './historial-comentario.controller';

@Module({
  controllers: [HistorialComentarioController],
  providers: [HistorialComentarioService],
})
export class HistorialComentarioModule {}
