import ColecaoUsuario from "../core/usuario/ColecaoUsuario.ts";
import ProvedorToken from "../core/usuario/ProvedorToken.ts";
import Usuario from "../core/usuario/Usuario.ts";
import { Request, Response, NextFunction, response } from "express";

export default function UsuarioMiddleware(
  colecao: ColecaoUsuario,
  provedorToken: ProvedorToken
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const acessoNegado = () => res.status(403).json({ err: "Acesso Negado." });
    try {
      const token = req.headers.authorization?.replace("Bearer ", "");
      if (!token) return acessoNegado();

      const usuarioToken = provedorToken.validar(token) as Usuario;
      const usuario = await colecao.buscarPorEmail(usuarioToken.email);

      if (!usuario) return acessoNegado();

      (req as any).usuario = usuario;

      next();
    } catch (err) {
      return acessoNegado();
    }
  };
}
