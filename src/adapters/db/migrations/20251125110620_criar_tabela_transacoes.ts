import type { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  const existe = await knex.schema.hasTable("transacao")
  if (existe) return

  return knex.schema.createTable("transacoes", (table) => {
    table.uuid("id").primary(), table.string("descricao").notNullable()
    table.decimal("valor").notNullable()
    table.date("vencimento").notNullable().defaultTo(knex.fn.now())
    table.uuid("usuario_id").references("id").inTable("usuarios").notNullable()
    // table.timestamps(true, true)
    // table.timestamp("deleted_at").nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("transacoes")
}
