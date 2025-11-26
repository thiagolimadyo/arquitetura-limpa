import UsuarioEmMemoria from "../fake/UsuarioEmMemoria.ts";
import RegistrarUsuario from "../../src/core/usuario/RegistrarUsuario.ts";
import InverterSenha from "../../src/adapters/auth/InverterSenha.ts";
import ProvedorCriptografia from "../../src/core/usuario/ProvedorCriptografia.ts";
import SenhaComEspaco from "../../src/adapters/auth/SenhaComEspaco.ts";
import ColecaoUsuario from "../../src/core/usuario/ColecaoUsuario.ts";
import ColecaoUsuarioDB from "../../src/adapters/db/ColecaoUsuarioDB.ts";
import BcryptAdapter from "../../src/adapters/auth/BcryptAdapter.ts";
import usuarios from "../data/usuarios.ts";

console.clear();

test("Deve registrar um usuário com a senha invertida", async () => {
  const colecao: ColecaoUsuario = new UsuarioEmMemoria();
  const provedorCriptografia: ProvedorCriptografia = new InverterSenha();
  const casoDeUso = new RegistrarUsuario(colecao, provedorCriptografia);

  const usuario = await casoDeUso.executar({
    nome: usuarios.usuarioCompleto.nome,
    email: usuarios.usuarioCompleto.email,
    senha: usuarios.usuarioCompleto.senha!,
  });

  expect(usuario).toHaveProperty("id");
  expect(usuario.nome).toBe(usuarios.usuarioCompleto.nome);
  expect(usuario.email).toBe(usuarios.usuarioCompleto.email);
  expect(usuario.senha).toBe("654321");
});

test("Deve registrar um usuário com espaços na senha", async () => {
  const colecao: ColecaoUsuario = new UsuarioEmMemoria();
  const provedorCriptografia: ProvedorCriptografia = new SenhaComEspaco();
  const casoDeUso = new RegistrarUsuario(colecao, provedorCriptografia);

  const usuario = await casoDeUso.executar({
    nome: "Xuxa da Silva",
    email: "x.silva@email.com",
    senha: "123456",
  });

  expect(usuario).toHaveProperty("id");
  expect(usuario.nome).toBe("Xuxa da Silva");
  expect(usuario.email).toBe("x.silva@email.com");
  expect(usuario.senha).toBe("1 2 3 4 5 6");
});

test("Deve registrar um usuário com senha criptografada pelo bcrypt", async () => {
  const colecao: ColecaoUsuario = new UsuarioEmMemoria();
  const provedorCriptografia: ProvedorCriptografia = new BcryptAdapter();
  const casoDeUso = new RegistrarUsuario(colecao, provedorCriptografia);

  const usuario = await casoDeUso.executar({
    nome: "Xuxa da Silva",
    email: "x.silva@email.com",
    senha: "123456",
  });

  expect(usuario).toHaveProperty("id");
  expect(usuario.nome).toBe("Xuxa da Silva");
  expect(usuario.email).toBe("x.silva@email.com");
  expect(provedorCriptografia.comparar("123456", usuario.senha!)).toBeTruthy();
});

test("Deve lançar erro ao tentar cadastrar um usuário já existente", async () => {
  const colecao: ColecaoUsuario = new UsuarioEmMemoria();
  const provedorCriptografia: ProvedorCriptografia = new BcryptAdapter();
  const casoDeUso = new RegistrarUsuario(colecao, provedorCriptografia);

  const nome = "Joana Dark";
  const email = "joana.dark@terra.com.br";
  const senha = "123456";

  await casoDeUso.executar({ nome, email, senha });

  const exec = async () => await casoDeUso.executar({ nome, email, senha });

  expect(exec).rejects.toThrow("Usuário já existe.");
});

test("Deve registrar um usuário no banco de dados", async () => {
  const colecao: ColecaoUsuario = new ColecaoUsuarioDB();
  const provedorCriptografia: ProvedorCriptografia = new BcryptAdapter();
  const casoDeUso = new RegistrarUsuario(colecao, provedorCriptografia);

  const usuario = await casoDeUso.executar({
    nome: usuarios.usuarioCompleto.nome,
    email: usuarios.usuarioCompleto.email,
    senha: usuarios.usuarioCompleto.senha!,
  });

  expect(usuario).toHaveProperty("id");
  expect(usuario.nome).toBe(usuarios.usuarioCompleto.nome);
  expect(usuario.email).toBe(usuarios.usuarioCompleto.email);
  expect(
    provedorCriptografia.comparar(
      usuarios.usuarioCompleto.senha!,
      usuario.senha!
    )
  ).toBeTruthy();
});
