import express from "express";
import RegistrarUsuarioController from "./controllers/RegistrarUsuarioController.ts";
import RegistrarUsuario from "./core/usuario/RegistrarUsuario.ts";
import ColecaoUsuarioDB from "./adapters/db/knex/ColecaoUsuarioDB.ts";
import CryptoReal from "./adapters/auth/CryptoReal.ts";
import LoginUsuarioController from "./controllers/LoginUsuarioController.ts";
import LoginUsuario from "./core/usuario/LoginUsuario.ts";

const app = express();
const port = process.env.PORT ?? 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(` 🔥 Server is running on port #${port}`);
});

// Rotas Abertas

const colecaoUsuario = new ColecaoUsuarioDB();
const provedorCriptografia = new CryptoReal();
const registrarUsuario = new RegistrarUsuario(
  colecaoUsuario,
  provedorCriptografia
);
new RegistrarUsuarioController(app, registrarUsuario);

const loginUsuario = new LoginUsuario(colecaoUsuario, provedorCriptografia);
new LoginUsuarioController(app, loginUsuario);
// Rotas Autenticadas
