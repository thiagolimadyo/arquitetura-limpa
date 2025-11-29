import ExtratoMensal from "core/transacao/ExtratoMensal.ts"
import { Express, Request, Response } from "express"

export default class ExtratoMensalController {
  constructor(
    private readonly servidor: Express,
    private readonly casoDeUso: ExtratoMensal,
    ...middlewares: any[]
  ) {
    const fn = async (req: Request, res: Response) => {
      try {
        const extrato = await casoDeUso.executar({
          usuario: (req as any).usuario,
          ano: +req.params.ano,
          mes: +req.params.mes,
        })

        console.log(extrato)

        return res.status(200).json(extrato)
      } catch (err: any) {
        return res.status(400).send(err.message)
      }
    }

    servidor.get("/extrato/:ano/:mes", middlewares, fn)
  }
}
