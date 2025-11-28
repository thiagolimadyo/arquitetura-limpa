import Saldo from "../../src/core/transacao/Saldo.ts"
import transacao from "../data/transacao.ts"

const lista = [
  { ...transacao.completa, valor: 5000 },
  { ...transacao.completa, valor: -300 },
  { ...transacao.completa, valor: -700 },
  { ...transacao.completa, valor: -1500 },
]
test("Deve calcular total das transações", () => {
  expect(new Saldo(lista).total).toBe(2500)
})

test("Deve calcular total de receitas", () => {
  expect(new Saldo(lista).receitas).toBe(5000)
})

test("Deve calcular total de despesas", () => {
  expect(new Saldo(lista).despesas).toBe(-2500)
})
