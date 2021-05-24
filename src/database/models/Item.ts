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
}
