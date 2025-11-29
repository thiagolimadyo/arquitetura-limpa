import Transacao from "../../src/core/transacao/Transacao.ts"

const transacaoRef = {
  descricao: "Transacao Genérica",
  valor: -1000,
  vencimento: new Date(),
  idUsuario: "22ddf101-d1a1-4546-838e-53f0fa7c910d",
} as Transacao

export default {
  completa: transacaoRef,
  lista: [
    { ...transacaoRef, descricao: "Salário", valor: 5000 },
    { ...transacaoRef, descricao: "Conta de Luz", valor: -450 },
    { ...transacaoRef, descricao: "Conta de Água", valor: -100 },
    { ...transacaoRef, descricao: "Conta de Telefone", valor: -250 },
  ],
}
