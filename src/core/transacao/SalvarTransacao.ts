import CasoDeUso from "core/shared/CasoDeUso.ts";
import Transacao from "./Transacao.ts";

export default class SalvarTransacao implements CasoDeUso<void, Transacao> {
  async executar(): Promise<Transacao> {
    return {
      id: "1",
      descricao: "Salário",
      valor: 1000,
      vencimento: new Date(),
      idUsuario: "1",
    };
  }
}
