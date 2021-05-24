import { GraphQLFieldConfig, GraphQLList } from 'graphql'
import invoiceType from '../types/invoiceType'
import Invoice from '../../database/models/Invoice'

const invoices: GraphQLFieldConfig<unknown, unknown> = {
  type: GraphQLList(invoiceType),
  resolve: () => new Invoice().findAll(),
}

export default invoices
