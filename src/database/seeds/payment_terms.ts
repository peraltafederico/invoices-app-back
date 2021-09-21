import { Knex } from 'knex'
import { validateEmptyTable } from '../utils'

export async function seed(knex: Knex): Promise<void> {
  const isTableEmpty = await validateEmptyTable(knex, 'payment_terms')

  if (!isTableEmpty) {
    return
  }

  await knex('payment_terms').del()

  await knex('payment_terms').insert([
    { id: 1, days: 1 },
    { id: 2, days: 7 },
    { id: 3, days: 14 },
    { id: 4, days: 30 },
  ])
}
