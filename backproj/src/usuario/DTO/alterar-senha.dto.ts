import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class AlterarsenhaDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  senha: string;
  @MinLength(6)
  senhaNova: string;
}
