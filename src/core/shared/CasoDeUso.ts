import Usuario from "core/usuario/Usuario.ts";

export default interface CasoDeUso<IN, OUT> {
  executar(dto: IN, usuario?: Usuario): Promise<OUT>;
}
