import Transacao from "./Transacao.ts"

export interface SaldoDTO {
  total: number
  receitas: number
  despesas: number
}

export default class Saldo {
  constructor(private readonly transacoes: Transacao[]) {}

  get dto(): SaldoDTO {
    return {
      total: this.total,
      receitas: this.receitas,
      despesas: this.despesas,
    }
  }

  get total(): number {
    return this.transacoes.reduce(this._totalizar, 0)
  }

  get receitas(): number {
    return this.transacoes.filter((t) => t.valor > 0).reduce(this._totalizar, 0)
  }

  get despesas(): number {
    return this.transacoes.filter((t) => t.valor < 0).reduce(this._totalizar, 0)
  }

  private _totalizar(total: number, transacao: Transacao) {
    return (total += Number(transacao.valor))
  }
}
