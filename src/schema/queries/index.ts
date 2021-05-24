import { GraphQLObjectType } from 'graphql'
import invoices from './invoices'

const query = new GraphQLObjectType({
  name: 'InvoiceQueries',
  fields: () => ({
    invoices,
  }),
})

export default query
