import { Knex } from 'knex'
import { format } from 'date-fns'
import faker from 'faker'
import { nanoid } from 'nanoid'
import { random, validateEmptyTable } from '../utils'

export async function seed(knex: Knex): Promise<void> {
  const isTableEmpty = await validateEmptyTable(knex, 'invoices')

  if (!isTableEmpty) {
    return
  }

  await knex('invoices').del()

  const data = Array.from({ length: 15 }).map(() => ({
    bussiness_id: nanoid(6),
    bill_from_street: faker.address.streetAddress(),
    bill_from_city: faker.address.cityName(),
    bill_from_post_code: faker.address.zipCode(),
    bill_from_country: faker.address.country(),
    bill_to_name: faker.name.findName(),
    bill_to_email: faker.internet.email(),
    bill_to_street: faker.address.streetAddress(),
    bill_to_city: faker.address.cityName(),
    bill_to_country: faker.address.country(),
    bill_to_post_code: faker.address.zipCode(),
    description: faker.lorem.sentence(),
    status: random(['paid', 'pending', 'draft']),
    date: format(faker.date.recent(), 'yyyy-MM-dd hh:mm:ss'),
    payment_term_id: random([1, 2, 3, 4]),
  }))

  await knex('invoices').insert(data)
}
