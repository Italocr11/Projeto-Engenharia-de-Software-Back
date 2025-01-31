import { Controller, Post, Body } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuarios.entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async criarUsuario(
    @Body('nome') nome: string,
    @Body('email') email: string,
    @Body('senha') senha: string,
    @Body('confSenha') confSenha: string,
    @Body('telefone') telefone: string,
  ): Promise<Usuario> {
    return this.usuariosService.createUser(
      nome,
      email,
      senha,
      confSenha,
      telefone,
    );
  }
}