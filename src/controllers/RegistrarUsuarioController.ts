import RegistrarUsuario from "@core/usuario/RegistrarUsuario.ts";
import { Express } from "express";

export default class RegistrarUsuarioController {
  constructor(
    private servidor: Express,
    private registrarUsuario: RegistrarUsuario
  ) {
    servidor.post("/registrar", async (req, res) => {
      try {
        await registrarUsuario.executar(
          req.body.nome,
          req.body.email,
          req.body.senha
        );
        return res.status(201).send();
      } catch (err: any) {
        return res.status(400).send(err.message);
      }
    });
  }
}
