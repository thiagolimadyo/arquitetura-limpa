import axios from "axios";
import Usuario from "../../src/core/usuario/Usuario";

const baseURL = process.env.PORT_URL;

test(`Deve registrar um novo usuário se não existir, ou erro se já existir`, async () => {
  const usuario: Partial<Usuario> = {
    nome: "Joana Dark",
    email: "j.dark2@microsoft.com",
    senha: "123456",
  };

  try {
    const res = await axios.post(`${baseURL}/registrar`, usuario);
    expect(res.status).toBe(201);
  } catch (e: any) {
    expect(e.response.status).toBe(400);
    expect(e.response.data).toBe("Usuário já existe.");
  }
});
