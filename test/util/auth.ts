import axios from "axios";
import usuarios from "../data/usuarios.ts";

const baseURL = process.env.PORT_URL;

export default async function getAuthorization() {
  const resposta = await axios.post(
    `${baseURL}/login`,
    usuarios.usuarioCompleto
  );
  return {
    headers: {
      Authorization: `Bearer ${resposta.data.token}`,
    },
  };
}
