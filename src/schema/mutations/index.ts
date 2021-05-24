import { GraphQLObjectType } from 'graphql'
import createInvoice from './createInvoice'
import updateInvoice from './updateInvoice'
import deleteInvoice from './deleteInvoice'

const mutation = new GraphQLObjectType({
  name: 'InvoiceMutations',
  fields: () => ({
    createInvoice,
    updateInvoice,
    deleteInvoice,
  }),
})

export default mutation
