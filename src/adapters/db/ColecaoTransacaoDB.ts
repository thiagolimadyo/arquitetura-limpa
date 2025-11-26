import Transacao from "../../core/transacao/Transacao.ts"
import ColecaoTransacao from "../../core/transacao/ColecaoTransacao.ts"
import conexao from "./conexao.ts"

export default class ColecaoTransacaoDB implements ColecaoTransacao {
  async adicionar(transacao: Transacao): Promise<void> {
    await conexao.table("transacoes").insert(this._praTabela(transacao))
  }

  async atualizar(transacao: Transacao): Promise<void> {
    await conexao
      .table("transacoes")
      .update(this._praTabela(transacao))
      .where("id", transacao.id)
  }

  async buscarPorId(idUsuario: string, id: string): Promise<Transacao | null> {
    const transacoes = await conexao
      .table("transacoes")
      .where(id, "usuario_id", idUsuario)
      .first()

    return this._daTabela(transacoes) ?? null
  }

  async buscarPorMes(
    idUsuario: string,
    ano: number,
    mes: number,
  ): Promise<Transacao[]> {
    const transacoes = await conexao
      .table("transacoes")
      .where("usuario_id", idUsuario)
      .andWhereRaw("EXTRACT(YEAR FROM vencimento) = ?", [ano])
      .andWhereRaw("EXTRACT(MONTH FROM vencimento) = ?", [mes])

    return transacoes.map(this._daTabela)
  }

  private _praTabela(transacao: Transacao): any {
    return {
      id: transacao.id,
      descricao: transacao.descricao,
      valor: transacao.valor,
      vencimento: transacao.vencimento.toISOString(),
      usuario_id: transacao.idUsuario,
    }
  }

  private _daTabela(transacao: any): Transacao {
    return {
      ...transacao,
      idUsuario: transacao.usuario_id,
    }
  }
}
