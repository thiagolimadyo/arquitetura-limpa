import type ColecaoUsuario from "../../../core/usuario/ColecaoUsuario.ts";
import type Usuario from "../../../core/usuario/Usuario.ts";
import conexao from "./conexao.ts";

export default class ColecaoUsuarioDB implements ColecaoUsuario {
  async inserir(usuario: Usuario): Promise<void> {
    await conexao.table("usuarios").insert(usuario);
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    const usuario = await conexao
      .table("usuarios")
      .select("*")
      .where("email", email)
      .first();

    return usuario;
  }
}
