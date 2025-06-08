import { IsEmail, IsNumber, IsString, Matches, Max, MaxLength, Min, MinLength,  } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    username: string;
    
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    direccion: string;

    @IsNumber()
    sexo: number;

    @IsString()
    @MinLength(3)
    @MaxLength(50)
    ciudad: string;

    @IsString()
    @MinLength(3)
    @MaxLength(50)
    departamento: string;
    
    @IsString()
    foto: string;

    @IsString()
    @MinLength(8)
    @MaxLength(15)
    telefono: string;

    @IsString()
    @MinLength(3)
    @MaxLength(50)
    nombre: string;

    @IsString()
    @MinLength(3)
    @MaxLength(50)
    apellido: string;
}