import type Usuario from "./Usuario.js";

export default interface ColecaoUsuario {
  inserir(usuario: Usuario): Promise<void>;
  buscarPorEmail(email: string): Promise<Usuario | null>;
}
