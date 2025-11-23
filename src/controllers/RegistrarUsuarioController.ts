import RegistrarUsuario, { Entrada } from "../core/usuario/RegistrarUsuario.ts";
import { Express } from "express";

export default class RegistrarUsuarioController {
  constructor(
    private readonly servidor: Express,
    private readonly casoDeUso: RegistrarUsuario
  ) {
    servidor.post("/registrar", async (req, res) => {
      try {
        await casoDeUso.executar({
          nome: req.body.nome,
          email: req.body.email,
          senha: req.body.senha,
        });

        return res.status(201).json();
      } catch (err: any) {
        return res.status(400).json({ err: err.message });
      }
    });
  }
}
