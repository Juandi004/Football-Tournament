import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword, MinLength } from "class-validator";

export class CreateAuthDto {
    @ApiProperty()
    @IsEmail()
    email!: string;

    @ApiProperty()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password!: string
}
