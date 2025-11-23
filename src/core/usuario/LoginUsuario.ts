import CryptoReal from "adapters/auth/CryptoReal.ts";
import ColecaoUsuario from "./ColecaoUsuario.ts";
import CasoDeUso from "core/shared/CasoDeUso.ts";
import Usuario from "./Usuario.ts";

export type Entrada = { email: string; senha: string };
export type Saida = { usuario: Usuario; token: string };

export default class LoginUsuario implements CasoDeUso<Entrada, Saida> {
  constructor(
    private readonly colecaoUsuario: ColecaoUsuario,
    private readonly provedorCrypto: CryptoReal
  ) {}

  async executar(dto: Entrada): Promise<Saida> {
    const usuarioExistente = await this.colecaoUsuario.buscarPorEmail(
      dto.email
    );
    if (!usuarioExistente) throw new Error("Usuário ou senha incorreta.");

    const mesmaSenha = this.provedorCrypto.comparar(
      dto.senha,
      usuarioExistente.senha!
    );

    if (!mesmaSenha) throw new Error("Usuário ou senha incorreta.");

    return {
      usuario: { ...usuarioExistente, senha: undefined },
      token: `TOKEN...`,
    };
  }
}
