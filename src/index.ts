import express from "express"
import RegistrarUsuarioController from "./controllers/RegistrarUsuarioController.ts"
import RegistrarUsuario from "./core/usuario/RegistrarUsuario.ts"
import ColecaoUsuarioDB from "./adapters/db/ColecaoUsuarioDB.ts"
import LoginUsuarioController from "./controllers/LoginUsuarioController.ts"
import LoginUsuario from "./core/usuario/LoginUsuario.ts"
import BcryptAdapter from "./adapters/auth/BcryptAdapter.ts"
import JwtAdapter from "./adapters/auth/JwtAdapter.ts"
import SalvarTransacao from "./core/transacao/SalvarTransacao.ts"
import SalvarTransacaoController from "./controllers/SalvarTransacaoController.ts"
import UsuarioMiddleware from "./controllers/UsuarioMiddleware.ts"
import ColecaoTransacaoDB from "../src/adapters/db/ColecaoTransacaoDB.ts"
import ExtratoMensal from "./core/transacao/ExtratoMensal.ts"
import ExtratoMensalController from "./controllers/ExtratoMensalController.ts"

const app = express()
const port = process.env.PORT ?? 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
  console.log(` 🔥 Server is running on port #${port}`)
})

// Rotas Abertas
const provedorToken = new JwtAdapter(process.env.JWT_SECRET!)

const colecaoUsuario = new ColecaoUsuarioDB()
const provedorCriptografia = new BcryptAdapter()
const registrarUsuario = new RegistrarUsuario(
  colecaoUsuario,
  provedorCriptografia,
)
new RegistrarUsuarioController(app, registrarUsuario)

const loginUsuario = new LoginUsuario(
  colecaoUsuario,
  provedorCriptografia,
  provedorToken,
)
new LoginUsuarioController(app, loginUsuario)
// Rotas Autenticadas

const usuarioMiddleware = UsuarioMiddleware(colecaoUsuario, provedorToken)
const colecaoTransacao = new ColecaoTransacaoDB()
const salvarTransacao = new SalvarTransacao(colecaoTransacao)
const extratoMensal = new ExtratoMensal(colecaoTransacao)

new SalvarTransacaoController(app, salvarTransacao, usuarioMiddleware)
new ExtratoMensalController(app, extratoMensal, usuarioMiddleware)
