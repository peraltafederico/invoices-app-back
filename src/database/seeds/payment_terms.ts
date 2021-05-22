import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('payment_terms').del()

  await knex('payment_terms').insert([
    { id: 1, days: 1 },
    { id: 2, days: 7 },
    { id: 3, days: 14 },
    { id: 4, days: 30 },
  ])
}
