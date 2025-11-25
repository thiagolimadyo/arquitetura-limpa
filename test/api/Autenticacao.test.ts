import axios from "axios";
import Usuario from "../../src/core/usuario/Usuario.ts";

const baseURL = process.env.PORT_URL;

const usuario: Partial<Usuario> = {
  nome: "Sérgio Reis",
  email: "sr@intel.com",
  senha: "123456",
};

test(`Deve registrar um novo usuário se não existir, ou erro se já existir`, async () => {
  try {
    const res = await axios.post(`${baseURL}/registrar`, usuario);
    expect(res.status).toBe(201);
  } catch (e: any) {
    expect(e.response.status).toBe(400);
    expect(e.response.data.err).toBe("Usuário já existe.");
  }
});

test("Deve logar com e-mail e senha corretos", async () => {
  const res = await axios.post(`${baseURL}/login`, {
    email: usuario.email,
    senha: usuario.senha,
  });
  expect(res.status).toBe(200);
  expect(res.data.usuario.nome).toBe(usuario.nome);
  expect(res.data.usuario.email).toBe(usuario.email);
  expect(res.data).toHaveProperty("token");
});
