// import dotenv from "dotenv";}
// dotenv.config({ path: "../../../../../.env" });

// console.log(process.env.DB_URL);

import knex from "knex";

export default knex({
  client: "pg",
  connection: "postgres://local:local@localhost:5432/local",
});
