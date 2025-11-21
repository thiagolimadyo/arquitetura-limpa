import type ColecaoUsuario from "../../app/usuario/ColecaoUsuario.js";
import type Usuario from "../../app/usuario/Usuario.js";

export default class UsuarioEmMemoria implements ColecaoUsuario {
  private itens: Usuario[] = [];

  async inserir(item: Usuario): Promise<void> {
    this.itens.push(item);
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    const usuario = this.itens.find((usuario) => usuario.email === email);

    return usuario ?? null;
  }
}
