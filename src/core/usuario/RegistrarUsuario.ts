import CasoDeUso from "../shared/CasoDeUso.ts";
import Id from "../shared/Id.ts";
import Usuario from "./Usuario.ts";
import ColecaoUsuario from "./ColecaoUsuario.ts";
import ProvedorCriptografia from "./ProvedorCriptografia.ts";

export type Entrada = { nome: string; email: string; senha: string };

export default class RegistrarUsuario implements CasoDeUso<Entrada, Usuario> {
  constructor(
    private readonly colecao: ColecaoUsuario,
    private readonly provedorCripto: ProvedorCriptografia
  ) {}

  async executar(dto: Entrada): Promise<Usuario> {
    const senhaCripto = this.provedorCripto.criptografar(dto.senha);

    const usuarioExistente = await this.colecao.buscarPorEmail(dto.email);
    if (usuarioExistente) throw new Error(`Usuário já existe.`);

    const usuario: Usuario = {
      id: Id.gerar(),
      nome: dto.nome,
      email: dto.email,
      senha: senhaCripto,
    };

    this.colecao.inserir(usuario);

    return usuario;
  }
}
