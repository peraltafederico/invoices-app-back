import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('items', function (table) {
    table.integer('id').unsigned().notNullable()
    table.foreign('id').references('id').inTable('invoices').onDelete('CASCADE')

    table.string('name').notNullable()
    table.integer('qty').notNullable()
    table.decimal('price').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('items')
}
