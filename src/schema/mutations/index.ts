import { GraphQLObjectType } from 'graphql'
import createInvoice from './createInvoice'
import updateInvoice from './updateInvoice'
import deleteInvoice from './deleteInvoice'
import updateStatusInvoice from './updateStatusInvoice'

const mutation = new GraphQLObjectType({
  name: 'InvoiceMutations',
  fields: () => ({
    createInvoice,
    updateInvoice,
    deleteInvoice,
    updateStatusInvoice,
  }),
})

export default mutation
