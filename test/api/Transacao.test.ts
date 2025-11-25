import axios from "axios";
import getAuthorization from "../util/auth.ts";

const baseURL = process.env.PORT_URL;

test("Deve registrar uma nova transação", async () => {
  const headers = await getAuthorization();
  const resposta = await axios.post(`${baseURL}/transacao`, "", headers);
  console.log(resposta.data);
  expect(resposta.status).toBe(200);
});
