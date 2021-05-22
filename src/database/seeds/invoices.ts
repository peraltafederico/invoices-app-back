import { Knex } from 'knex'
import { format } from 'date-fns'

export async function seed(knex: Knex): Promise<void> {
  await knex('invoices').del()

  await knex('invoices').insert([
    {
      id: 1,
      bussiness_id: 'ABCDEF',
      bill_from_street: 'Chenaut',
      bill_from_city: 'Isidro Casanova',
      bill_from_post_code: '1765',
      bill_from_country: 'Argentina',
      bill_to_name: 'Federico',
      bill_to_email: 'peralta.federico.manuel@gmail.com',
      bill_to_street: 'Thames',
      bill_to_city: 'San Justo',
      bill_to_country: 'Argentina',
      bill_to_post_code: '1754',
      description: 'A macbook pro',
      status: 'pending',
      date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
      payment_term_id: 1,
    },
  ])
}
