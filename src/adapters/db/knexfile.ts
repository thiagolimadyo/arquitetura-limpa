// import dotenv from "dotenv";
// dotenv.config({ path: "../../../../../.env" });
// dotenv.config();

// console.log(process.env.DB_URL);

const config = {
  client: "pg",
  // connection: process.env.DB_URL,
  connection: "postgres://local:local@localhost:5432/local",
  migrations: {
    tableName: "knex_migrations",
  },
  pool: {
    min: 2,
    max: 10,
  },
};

export default config;
