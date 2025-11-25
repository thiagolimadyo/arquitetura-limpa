import SalvarTransacao from "core/transacao/SalvarTransacao.ts";
import { Express, Request, Response } from "express";

export default class SalvarTransacaoController {
  constructor(
    private readonly servidor: Express,
    private readonly casoDeUso: SalvarTransacao,
    ...middlewares: any[]
  ) {
    const fn = async (req: Request, res: Response) => {
      try {
        const resposta = await casoDeUso.executar();
        console.log(resposta);
        return res.status(200).json(resposta);
      } catch (err: any) {
        return res.status(400).json({ err: err.message });
      }
    };

    servidor.post("/transacao", middlewares, fn);
  }
}
