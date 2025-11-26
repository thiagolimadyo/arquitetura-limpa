import SalvarTransacao from "../core/transacao/SalvarTransacao.ts"
import { Express, Request, Response } from "express"

export default class SalvarTransacaoController {
  constructor(
    private readonly servidor: Express,
    private readonly casoDeUso: SalvarTransacao,
    ...middlewares: any[]
  ) {
    const fn = async (req: Request, res: Response) => {
      try {
        const transacao = {
          descricao: req.body.descricao,
          valor: +req.body.valor,
          vencimento: new Date(req.body.vencimento),
          idUsuario: req.body.idUsuario,
        }

        await casoDeUso.executar({
          transacao: transacao,
          id: req.params.id,
          usuario: (req as any).usuario,
        })

        return res.status(200).send()
      } catch (err: any) {
        return res.status(400).send(err.message)
      }
    }

    servidor.post("/transacao", middlewares, fn)
    servidor.post("/transacao/:id", middlewares, fn)
  }
}
