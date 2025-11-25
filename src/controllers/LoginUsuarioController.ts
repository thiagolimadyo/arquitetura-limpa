import LoginUsuario from "../core/usuario/LoginUsuario.ts";
import { Express } from "express";

export default class LoginUsuarioController {
  constructor(
    private readonly servidor: Express,
    private readonly casoDeUso: LoginUsuario
  ) {
    servidor.post("/login", async (req, res) => {
      try {
        const resposta = await casoDeUso.executar({
          email: req.body.email,
          senha: req.body.senha,
        });

        return res.status(200).json(resposta);
      } catch (err: any) {
        return res.status(401).json({ err: err.message });
      }
    });
  }
}
