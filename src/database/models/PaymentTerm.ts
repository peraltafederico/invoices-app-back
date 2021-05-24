import Model from './Model'

interface PaymentTermProps {
  id: number
  days: number
}

export default class PaymentTerm extends Model<PaymentTermProps> {
  constructor() {
    super('payment_terms')
  }
}
