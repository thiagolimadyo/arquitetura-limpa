import type Usuario from "./Usuario.ts";

export default interface ColecaoUsuario {
  inserir(usuario: Usuario): Promise<void>;
  buscarPorEmail(email: string): Promise<Usuario | null>;
}
