import { IsString, IsOptional, IsInt, IsUUID } from 'class-validator';

export class CreateBookDto {
    @IsString()
    titulo: string;

    @IsString()
    autor: string;

    @IsString()
    genero: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsOptional()
    @IsInt()
    anioPublicacion?: number;

    @IsUUID()
    usuarioId: string;

    @IsString()
    imagen: string;
}
