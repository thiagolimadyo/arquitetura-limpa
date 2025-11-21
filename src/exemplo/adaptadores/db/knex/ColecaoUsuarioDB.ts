import type ColecaoUsuario from "../../../app/usuario/ColecaoUsuario";
import type Usuario from "../../../app/usuario/Usuario";
import conexao from "./conexao";

export default class ColecaoUsuarioDB implements ColecaoUsuario {
  async inserir(usuario: Usuario): Promise<void> {
    await conexao.table("usuario").insert(usuario);
  }
}
