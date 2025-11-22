import dotenv from "dotenv";
dotenv.config({ path: "../../../../../.env" });

console.log(process.env.DB_URL);

const config = {
  client: "pg",
  connection: process.env.DB_URL,
  migrations: {
    tableName: "knex_migrations",
  },
  pool: {
    min: 2,
    max: 10,
  },
};

export default config;
