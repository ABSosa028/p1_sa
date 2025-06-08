import { IsOptional, IsString } from "class-validator";

export class CreateCollectionDto {

    @IsString()
    nombre: string;

    @IsOptional()
    @IsString()
    descripcion?: string;
}
