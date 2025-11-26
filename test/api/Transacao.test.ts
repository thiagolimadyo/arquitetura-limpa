import axios from "axios"
import getAuthorization from "../util/auth.ts"
import transacao from "../data/transacao.ts"

const baseURL = process.env.PORT_URL

test("Deve registrar uma nova transação", async () => {
  const headers = await getAuthorization()
  const resposta = await axios.post(
    `${baseURL}/transacao`,
    transacao.transacaoCompleta,
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
      ...transacao.transacaoCompleta,
      descricao: "Conta de Internet",
      valor: 220.99,
    },
    headers,
  )
  console.log(resposta.data)
  expect(resposta.status).toBe(200)
})
