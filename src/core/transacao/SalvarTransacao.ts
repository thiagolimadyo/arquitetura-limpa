import CasoDeUso from "core/shared/CasoDeUso.ts"
import Transacao from "./Transacao.ts"
import ColecaoTransacao from "./ColecaoTransacao.ts"
import Id from "../../core/shared/Id.ts"
import Usuario from "../../core/usuario/Usuario.ts"

export type Entrada = { transacao: Transacao; id: string; usuario: Usuario }

export default class SalvarTransacao implements CasoDeUso<Entrada, void> {
  constructor(private readonly colecao: ColecaoTransacao) {}

  async executar(dto: Entrada): Promise<void> {
    if (dto.transacao.idUsuario !== dto.usuario.id) {
      throw new Error("Usuário não autorizado.")
    }

    const transacao = {
      ...dto.transacao,
      id: dto.id ?? Id.gerar(),
    }

    dto.id
      ? await this.colecao.atualizar(transacao)
      : await this.colecao.adicionar(transacao)
  }
}
