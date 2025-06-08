import { IsArray, IsOptional, IsString, IsUUID } from "class-validator";

export class CreatePersonalLibreryDto {
   @IsUUID()
  usuarioId: string;

  @IsArray()
  @IsUUID('all', { each: true })
  librosIds: string[];

  @IsOptional()
  @IsString()
  estadoLectura?: string;

  @IsOptional()
  @IsString()
  notas?: string;
}
