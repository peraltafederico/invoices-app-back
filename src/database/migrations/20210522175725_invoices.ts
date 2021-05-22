import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('invoices', function (table) {
    table.increments().primary()
    table.string('bussiness_id', 255).notNullable()

    table.string('bill_from_street', 255).notNullable()
    table.string('bill_from_city', 255).notNullable()
    table.string('bill_from_post_code', 255).notNullable()
    table.string('bill_from_country', 255).notNullable()

    table.string('bill_to_name', 255).notNullable()
    table.string('bill_to_email', 255).notNullable()
    table.string('bill_to_street', 255).notNullable()
    table.string('bill_to_city', 255).notNullable()
    table.string('bill_to_post_code', 255).notNullable()
    table.string('bill_to_country', 255).notNullable()

    table.string('description', 255).notNullable()

    table
      .enum('status', ['paid', 'pending', 'draft'])
      .defaultTo('pending')
      .notNullable()

    table.timestamp('date').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('invoices')
}
