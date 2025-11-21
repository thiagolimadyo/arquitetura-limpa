import type Colecao from "../portas/Colecao.ts";
import type ProvedorCriptografia from "../portas/ProvedorCriptografia.ts";
import type Usuario from "./Usuario.ts";

export default class RegistrarUsuario {
  constructor(
    private readonly colecao: Colecao,
    private readonly provedorCripto: ProvedorCriptografia
  ) {}

  executar(nome: string, email: string, senha: string): Usuario {
    const senhaCripto = this.provedorCripto.criptografar(senha);

    const usuario: Usuario = {
      id: (Math.random() * 1000).toFixed(0),
      nome,
      email,
      senha: senhaCripto,
    };

    const result = this.colecao.inserir(usuario);

    console.log(result);

    return result;
  }
}
