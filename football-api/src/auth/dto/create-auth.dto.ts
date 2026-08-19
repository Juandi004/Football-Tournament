import { IsEmail, IsStrongPassword, MinLength } from "class-validator";

export class CreateAuthDto {
    @IsEmail()
    email!: string;

    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password!: string
}
