import { IsEmail, IsNotEmpty } from 'class-validator';

export class AlterarEmailDto {
  @IsEmail()
  email: string;
  @IsEmail()
  novoEmail: string;
  @IsNotEmpty()
  senha: string;
}
