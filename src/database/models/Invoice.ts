import Model from './Model'

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
}
