import Transacao from "./Transacao.ts";

export default interface ColecaoTransacao {
  adicionar(transacao: Transacao): Promise<void>;
  atualizar(transacao: Transacao): Promise<void>;
  buscarPorId(idUsuario: string, id: string): Promise<Transacao | null>;
  buscarPorMes(
    idUsuario: string,
    ano: number,
    mes: number
  ): Promise<Transacao[]>;
}
