import { Knex } from 'knex'
import { validateEmptyTable } from '../utils'

export async function seed(knex: Knex): Promise<void> {
  const isTableEmpty = await validateEmptyTable(knex, 'items')

  if (!isTableEmpty) {
    return
  }

  await knex('items').del()

  await knex('items').insert([
    { id: 1, name: 'Tennis Racket', qty: 1, price: 169.99 },
    { id: 1, name: 'T-Shirt', qty: 2, price: 50 },
  ])
}
