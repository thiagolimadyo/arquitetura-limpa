// import dotenv from "dotenv";
// dotenv.config();

import knex from "knex";

import type { Knex } from "knex";

const db: Knex = knex({
  client: "pg",
  connection: "postgres://local:local@localhost:5432/local",
  // connection: process.env.DB_URL,
});

export default db;
