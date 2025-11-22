import type ProvedorCriptografia from "../../core/usuario/ProvedorCriptografia.ts";

export default class SenhaComEspaco implements ProvedorCriptografia {
  criptografar(senha: string): string {
    return senha.split("").join(" ");
  }

  comparar(senha: string, senhaCriptografada: string): boolean {
    const senhaFornecida = this.criptografar(senha);
    return senhaFornecida === senhaCriptografada;
  }
}
