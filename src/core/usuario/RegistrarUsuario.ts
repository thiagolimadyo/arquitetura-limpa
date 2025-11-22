import type ProvedorCriptografia from "./ProvedorCriptografia.ts";
import type ColecaoUsuario from "./ColecaoUsuario.ts";
import type Usuario from "./Usuario.ts";
import Id from "../shared/Id.ts";

export default class RegistrarUsuario {
  constructor(
    private readonly colecao: ColecaoUsuario,
    private readonly provedorCripto: ProvedorCriptografia
  ) {}

  async executar(nome: string, email: string, senha: string): Promise<Usuario> {
    const senhaCripto = this.provedorCripto.criptografar(senha);

    const usuarioExistente = await this.colecao.buscarPorEmail(email);
    if (usuarioExistente) throw new Error(`Usuário já existe.`);

    const usuario: Usuario = {
      id: Id.gerar(),
      nome,
      email,
      senha: senhaCripto,
    };

    this.colecao.inserir(usuario);

    return usuario;
  }
}
