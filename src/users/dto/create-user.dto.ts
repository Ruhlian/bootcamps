import { IsString, IsEmail, IsEnum, IsArray, IsInt } from 'class-validator';

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsEnum(['Usuario', 'Editor', 'Administrador'])
    role: string;

    @IsArray()
    @IsInt({ each: true })
    bootcamps: number[];  // Arreglo de IDs de Bootcamps
}
