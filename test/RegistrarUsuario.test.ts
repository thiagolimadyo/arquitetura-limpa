import UsuarioEmMemoria from "../src/exemplo/adaptadores/db/UsuarioEmMemoria";
import RegistrarUsuario from "../src/exemplo/app/usuario/RegistrarUsuario";
import InverterSenha from "../src/exemplo/adaptadores/auth/InverterSenha";
import ProvedorCriptografia from "../src/exemplo/app/usuario/ProvedorCriptografia";
import SenhaComEspaco from "../src/exemplo/adaptadores/auth/SenhaComEspaco";
import CryptoReal from "../src/exemplo/adaptadores/auth/CryptoReal";
import ColecaoUsuario from "../src/exemplo/app/usuario/ColecaoUsuario";
import ColecaoUsuarioDB from "../src/exemplo/adaptadores/db/knex/ColecaoUsuarioDB";

console.clear();

test("Deve registrar um usuário com a senha invertida", () => {
  const colecao: ColecaoUsuario = new UsuarioEmMemoria();
  const provedorCriptografia: ProvedorCriptografia = new InverterSenha();
  const casoDeUso = new RegistrarUsuario(colecao, provedorCriptografia);

  const usuario = casoDeUso.executar(
    "Xuxa da Silva",
    "x.silva@email.com",
    "123456"
  );

  expect(usuario).toHaveProperty("id");
  expect(usuario.nome).toBe("Xuxa da Silva");
  expect(usuario.email).toBe("x.silva@email.com");
  expect(usuario.senha).toBe("654321");
});

test("Deve registrar um usuário com espaços na senha", () => {
  const colecao: ColecaoUsuario = new UsuarioEmMemoria();
  const provedorCriptografia: ProvedorCriptografia = new SenhaComEspaco();
  const casoDeUso = new RegistrarUsuario(colecao, provedorCriptografia);

  const usuario = casoDeUso.executar(
    "Xuxa da Silva",
    "x.silva@email.com",
    "123456"
  );

  expect(usuario).toHaveProperty("id");
  expect(usuario.nome).toBe("Xuxa da Silva");
  expect(usuario.email).toBe("x.silva@email.com");
  expect(usuario.senha).toBe("1 2 3 4 5 6");
});

test("Deve registrar um usuário com senha criptografada pelo bcrypt", () => {
  const colecao: ColecaoUsuario = new UsuarioEmMemoria();
  const provedorCriptografia: ProvedorCriptografia = new CryptoReal();
  const casoDeUso = new RegistrarUsuario(colecao, provedorCriptografia);

  const usuario = casoDeUso.executar(
    "Xuxa da Silva",
    "x.silva@email.com",
    "123456"
  );

  expect(usuario).toHaveProperty("id");
  expect(usuario.nome).toBe("Xuxa da Silva");
  expect(usuario.email).toBe("x.silva@email.com");
  expect(provedorCriptografia.comparar("123456", usuario.senha!)).toBeTruthy();
});

test.skip("Deve registrar um usuário no banco de dados", () => {
  const colecao: ColecaoUsuario = new ColecaoUsuarioDB();
  const provedorCriptografia: ProvedorCriptografia = new CryptoReal();
  const casoDeUso = new RegistrarUsuario(colecao, provedorCriptografia);

  const usuario = casoDeUso.executar(
    "Xuxa da Silva",
    "x.silva@email.com",
    "123456"
  );

  expect(usuario).toHaveProperty("id");
  expect(usuario.nome).toBe("Xuxa da Silva");
  expect(usuario.email).toBe("x.silva@email.com");
  expect(provedorCriptografia.comparar("123456", usuario.senha!)).toBeTruthy();
});
