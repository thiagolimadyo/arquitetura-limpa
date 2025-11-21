import type ColecaoUsuario from "../../app/usuario/ColecaoUsuario.js";
import type Usuario from "../../app/usuario/Usuario.js";

export default class UsuarioEmMemoria implements ColecaoUsuario {
  private static itens: Usuario[] = [];

  async inserir(item: Usuario): Promise<void> {
    UsuarioEmMemoria.itens.push(item);
  }
}
