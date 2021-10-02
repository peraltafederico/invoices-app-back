import { Knex } from 'knex'
import { format } from 'date-fns'
import faker from 'faker'
import { nanoid } from 'nanoid'
import { random, validateEmptyTable } from '../utils'

const INVOICES_AMOUNT = 15

export async function seed(knex: Knex): Promise<void> {
  const isInvoicesTableEmpty = await validateEmptyTable(knex, 'invoices')
  const isItemsTableEmpty = await validateEmptyTable(knex, 'items')

  if (!isInvoicesTableEmpty && !isItemsTableEmpty) {
    return
  }

  const invoices: Record<string, string | number>[] = []
  const items: Record<string, string | number>[] = []

  for (let x = 0; x < INVOICES_AMOUNT; x++) {
    invoices.push({
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
    })

    const ITEMS_AMOUNT = faker.datatype.number({
      min: 1,
      max: 5,
    })

    for (let j = 0; j < ITEMS_AMOUNT; j++) {
      items.push({
        id: x + 1,
        name: faker.commerce.productName(),
        qty: faker.datatype.number({
          min: 1,
          max: 20,
        }),
        price: faker.commerce.price(),
      })
    }
  }

  await knex('invoices').insert(invoices)
  await knex('items').insert(items)
}
