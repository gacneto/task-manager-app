import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  name: string;

  @IsEmail({}, { message: 'Por favor, insira um email válido.' })
  @IsNotEmpty({ message: 'O email não pode ser vazio.' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  @IsNotEmpty({ message: 'A senha não pode ser vazia.' })
  password: string;
}