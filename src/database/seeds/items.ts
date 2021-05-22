import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('items').del()

  await knex('items').insert([
    { id: 1, name: 'Tennis Racket', qty: 1, price: 169.99 },
    { id: 1, name: 'T-Shirt', qty: 2, price: 50 },
  ])
}
