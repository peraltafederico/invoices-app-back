/* eslint-disable class-methods-use-this */
import Model from './Model'
import database from '../connection'

export interface InvoiceProps {
  id: number
  bussinessId: string
  billFromStreet: string
  billFromCity: string
  billFromPostCode: string
  billFromCountry: string
  billToName: string
  billToEmail: string
  billToStreet: string
  billToCity: string
  billToPostCode: string
  billToCountry: string
  description: string
  status: string
  date: string
  paymentTermId: number
}

export default class Invoice extends Model<InvoiceProps> {
  constructor() {
    super('invoices')
  }

  findAll() {
    return this.model
      .select(
        'invoices.*',
        database.raw('sum(items.price * items.qty) as total')
      )
      .leftJoin('items', 'invoices.id', 'items.id')
      .groupBy('invoices.id')
  }

  findOne(id: number) {
    return this.findAll().where({ 'invoices.id': id }).first()
  }
}
