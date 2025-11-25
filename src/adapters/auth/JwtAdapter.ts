import ProvedorToken from "../../core/usuario/ProvedorToken.ts";
import jwt from "jsonwebtoken";

export default class JwtAdapter implements ProvedorToken {
  constructor(private readonly secret: string) {
    console.log(secret);
  }

  gerar(payload: string | object): string {
    return jwt.sign(payload, this.secret, { expiresIn: `1d` });
  }

  validar(token: string): string | object {
    return jwt.verify(token, this.secret);
  }
}
