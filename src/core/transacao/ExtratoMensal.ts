import CasoDeUso from "../../core/shared/CasoDeUso.ts"
import Transacao from "./Transacao.ts"
import Usuario from "../../core/usuario/Usuario.ts"
import ColecaoTransacaoDB from "adapters/db/ColecaoTransacaoDB.ts"
import Saldo, { SaldoDTO } from "./Saldo.ts"

export type Entrada = {
  usuario: Usuario
  ano: number
  mes: number
}

export type Saida = {
  transacoes: Transacao[]
  saldo: SaldoDTO
}

export default class ExtratoMensal implements CasoDeUso<Entrada, Saida> {
  constructor(private readonly colecao: ColecaoTransacaoDB) {}

  async executar(dto: Entrada): Promise<Saida> {
    const transacoes = await this.colecao.buscarPorMes(
      dto.usuario.id,
      dto.ano,
      dto.mes,
    )

    return {
      transacoes,
      saldo: new Saldo(transacoes).dto,
    }
  }
}
