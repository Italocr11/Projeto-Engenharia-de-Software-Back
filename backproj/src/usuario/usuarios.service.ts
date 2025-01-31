import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuarios.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async createUser(
    nome: string,
    email: string,
    senha: string,
    confSenha: string,
    telefone: string,
  ): Promise<Usuario> {
    if (senha != confSenha) {
      throw new Error('As senhas não combinam!');
    }

    const usuario = this.usuarioRepository.create({
      nome,
      email,
      senha,
      telefone,
    });

    return this.usuarioRepository.save(usuario);
  }


  async deletarUsuarioID(id: number): Promise<void> {
    const resultado = await this.usuarioRepository.delete(id);

    if (resultado.affected === 0) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado!`);
    }
  }

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
}