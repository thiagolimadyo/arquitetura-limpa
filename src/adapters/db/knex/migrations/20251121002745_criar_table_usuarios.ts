import knex from "knex";

import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const existe = await knex.schema.hasTable("usuarios");
  if (existe) return;

  return knex.schema.createTable("usuarios", (table) => {
    table.uuid("id").primary(),
      table.string("nome").notNullable(),
      table.string("email").notNullable().unique(),
      table.string("senha").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("usuarios");
}
