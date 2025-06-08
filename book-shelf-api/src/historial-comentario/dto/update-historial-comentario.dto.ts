import { PartialType } from '@nestjs/mapped-types';
import { CreateHistorialComentarioDto } from './create-historial-comentario.dto';

export class UpdateHistorialComentarioDto extends PartialType(CreateHistorialComentarioDto) {}
