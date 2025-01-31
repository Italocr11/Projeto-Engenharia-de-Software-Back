import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  HttpCode,
  ParseIntPipe,
  UnauthorizedException,
  Patch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuarios.entity';
import { AlterarsenhaDto } from './DTO/alterar-senha.dto';
import { AlterarEmailDto } from './DTO/alterar-email.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async criarUsuario(
    @Body('nome') nome: string,
    @Body('email') email: string,
    @Body('senha') senha: string,
    @Body('telefone') telefone: string,
  ): Promise<Usuario> {
    return this.usuariosService.criarUsuario(nome, email, senha, telefone);
  }

  @Delete(':id')
  @HttpCode(204)
  async deletarUsuarioID(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.usuariosService.deletarUsuarioID(id);
  }

  @Post('login')
  async login(@Body() body: { email: string; senha: string }) {
    const { email, senha } = body;
    const usuario = await this.usuariosService.validarUsuario(email, senha);

    if (!usuario) {
      throw new UnauthorizedException('Informações Inválidas!');
    }

    return this.usuariosService.login(usuario);
  }

  @Patch('altnome')
  async novoNome(@Body() body: { email: string; nome: string }) {
    const { email, nome } = body;
    const sucesso = await this.usuariosService.altNome(email, nome);

    if (!sucesso) {
      throw new HttpException(
        'Usuário não encontrado!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      message: 'Nome alterado com sucesso!',
      usuario: sucesso,
    };
  }

  @Patch('alttel')
  async novoTelefone(@Body() body: { email: string; telefone: string }) {
    const { email, telefone } = body;
    const sucesso = await this.usuariosService.altTelefone(email, telefone);

    if (!sucesso) {
      throw new HttpException(
        'Usuário não encontrado!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      message: 'Telefone alterado com sucesso!',
      usuario: sucesso,
    };
  }

  @Patch('altsenha')
  async novaSenha(@Body() alterarsenhaDto: AlterarsenhaDto) {
    const { email, senha, senhaNova } = alterarsenhaDto;
    const sucesso = await this.usuariosService.altSenha(
      email,
      senha,
      senhaNova,
    );

    if (!sucesso) {
      throw new HttpException(
        'Senha atual incorreta ou usuário não encontrado!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return { message: 'Senha alterada com sucesso!' };
  }

  @Patch('altemail')
  async novoEmail(@Body() alterarEmailDto: AlterarEmailDto) {
    const { email, novoEmail, senha } = alterarEmailDto;
    const sucesso = await this.usuariosService.altEmail(
      email,
      novoEmail,
      senha,
    );

    if (!sucesso) {
      throw new HttpException(
        'Email atual incorreto ou usuário não encontrado!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return { message: 'Email alterado com sucesso!', usuario: sucesso };
  }
}
