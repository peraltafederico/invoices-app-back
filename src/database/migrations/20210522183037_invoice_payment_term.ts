import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('invoices', function (table) {
    table.integer('payment_term_id').unsigned().notNullable()

    table.foreign('payment_term_id').references('id').inTable('payment_terms')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('invoices', function (table) {
    table.dropForeign('payment_term_id')

    table.dropColumn('payment_term_id')
  })
}
