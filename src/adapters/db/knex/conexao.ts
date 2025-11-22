import knex from "knex";

import type { Knex } from "knex";

const db: Knex = knex({
  client: "pg",
  connection: "postgres://local:local@localhost:5432/local",
});

export default db;
