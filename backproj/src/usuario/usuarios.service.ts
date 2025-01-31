import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuarios.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async criarUsuario(
    nome: string,
    email: string,
    senha: string,
    telefone: string,
  ): Promise<Usuario> {
    const usuario = this.usuarioRepository.create({
      nome,
      email,
      senha,
      telefone,
    });

    return this.usuarioRepository.save(usuario);
  }

  //Deletar registro

  async deletarUsuarioID(id: number): Promise<void> {
    const resultado = await this.usuarioRepository.delete(id);

    if (resultado.affected === 0) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado!`);
    }
  }

  //Login

  async validarUsuario(email: string, senha: string): Promise<Usuario | null> {
    const usuario = await this.usuarioRepository.findOne({ where: { email } });

    if (usuario && senha === usuario.senha) {
      return usuario;
    }
    return null;
  }

  async login(usuario: Usuario) {
    return { message: 'Login feito com sucesso!', usuario };
  }

  //Alterar senha

  async altSenha(
    email: string,
    senha: string,
    novaSenha: string,
  ): Promise<boolean> {
    const usuario = await this.usuarioRepository.findOne({ where: { email } });

    if (!usuario || usuario.senha !== senha) {
      return false;
    }

    usuario.senha = novaSenha;
    await this.usuarioRepository.save(usuario);
    return true;
  }

  //Alterar nome
  async altNome(email: string, nome: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { email } });

    if (!usuario) {
      throw new NotFoundException(
        `Usuário com o email ${email} não encontrado!`,
      );
    }

    usuario.nome = nome;
    await this.usuarioRepository.save(usuario);
    return usuario;
  }

  //Alterar telefone
  async altTelefone(email: string, telefone: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { email } });

    if (!usuario) {
      throw new NotFoundException(
        `Usuário com o email ${email} não encontrado!`,
      );
    }

    usuario.telefone = telefone;
    await this.usuarioRepository.save(usuario);
    return usuario;
  }

  //Alterar email

  async altEmail(email: string, novoEmail: string, senha: string) {
    const verifEmail = await this.usuarioRepository.findOne({
      where: { email: novoEmail },
    });

    if (verifEmail) {
      throw new BadRequestException(`O email ${novoEmail} já está em uso!`);
    }

    const usuario = await this.usuarioRepository.findOne({ where: { email } });

    if (!usuario) {
      throw new NotFoundException(
        `Usuário com o email ${email} não encontrado!`,
      );
    }

    if (!usuario || usuario.senha !== senha) {
      throw new BadRequestException(
        `Senha incorreta ou usuário não encontrado!`,
      );
    }

    usuario.email = novoEmail;
    await this.usuarioRepository.save(usuario);

    return usuario;
  }
}
