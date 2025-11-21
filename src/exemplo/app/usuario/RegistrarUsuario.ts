import type ProvedorCriptografia from "./ProvedorCriptografia";
import type ColecaoUsuario from "./ColecaoUsuario";
import type Usuario from "./Usuario";
import Id from "../shared/Id";

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
