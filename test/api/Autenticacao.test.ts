import axios from "axios";
import Usuario from "../../src/core/usuario/Usuario";

const baseURL = process.env.PORT_URL;

test(`Deve registrar um novo usuário se não existir, ou erro se já existir`, async () => {
  const usuario: Partial<Usuario> = {
    nome: "João do Pulo",
    email: "jp@intel.com",
    senha: "123456",
  };

  try {
    const res = await axios.post(`${baseURL}/registrar`, usuario);
    expect(res.status).toBe(201);
  } catch (e: any) {
    expect(e.response.status).toBe(400);
    expect(e.response.data.err).toBe("Usuário já existe.");
  }
});

test("LoginUSuario, Deve validar se o usuário existe e se a senha é igual", async () => {
  const res = await axios.post(`${baseURL}/login`, {
    email: "jp@intel.com",
    senha: "123456",
  });
  console.log(`res`, res.data);
  expect(res.status).toBe(200);
  expect(res.data.usuario.nome).toBe("João do Pulo");
  expect(res.data.usuario.email).toBe("jp@intel.com");
  expect(res.data).toHaveProperty("token");
});
