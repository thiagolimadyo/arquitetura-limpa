import axios from "axios"
import getAuthorization from "../util/auth.ts"
import transacao from "../data/transacao.ts"

const baseURL = process.env.PORT_URL

test("Deve registrar uma nova transação", async () => {
  const headers = await getAuthorization()
  const resposta = await axios.post(
    `${baseURL}/transacao`,
    transacao.completa,
    headers,
  )
  console.log(resposta.data)
  expect(resposta.status).toBe(200)
})

test("Deve alterar uma transação por id", async () => {
  const headers = await getAuthorization()
  const resposta = await axios.post(
    `${baseURL}/transacao/cdbd1fe3-7990-4c33-bf7b-a0501dae2f6d`,
    {
      ...transacao.completa,
      descricao: "Conta de Internet",
      valor: 220.99,
    },
    headers,
  )
  console.log(resposta.data)
  expect(resposta.status).toBe(200)
})

test("Deve popular com uma lista de transações", async () => {
  const headers = await getAuthorization()

  const respostas = transacao.lista.map(async (t) => {
    const resposta = await axios.post(
      `
      ${baseURL}/transacao`,
      t,
      headers,
    )
    return resposta.status
  })
  const listaDeStatus = await Promise.all(respostas)
  expect(listaDeStatus.every((s) => s === 200)).toBe(true)
  console.log(listaDeStatus)
})

test("Deve retornar o extrato mensal + saldo", async () => {
  const headers = await getAuthorization()

  const resposta = await axios.get(
    `
    ${baseURL}/extrato/2025/11`,
    headers,
  )

  console.log(resposta.data)
  expect(resposta.status).toBe(200)
  expect(resposta.data).toHaveProperty("transacoes")
  expect(resposta.data).toHaveProperty("saldo")
})
