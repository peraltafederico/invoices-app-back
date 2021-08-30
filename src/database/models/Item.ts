import database from '../connection'
import Model from './Model'

export interface ItemProps {
  id: number
  name: string
  qty: number
  price: string
}

export default class Item extends Model<ItemProps> {
  constructor() {
    super('items')
  }

  createBulk(items: ItemProps[], invoiceId: number) {
    return this.create(items.map((i) => ({ ...i, id: invoiceId })))
  }

  destroyAllFromInvoice(id: string | number) {
    return this.model.delete().where({ id })
  }

  findAllFromInvoice(id: number) {
    return this.model
      .select('items.*', database.raw('sum(items.price * items.qty) as total'))
      .leftJoin('invoices', 'items.id', 'invoices.id')
      .groupBy('items.id')
      .where({ 'items.id': id })
  }
}
