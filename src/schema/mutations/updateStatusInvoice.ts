import {
  GraphQLFieldConfig,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql'
import invoiceType from '../types/invoiceType'
import Invoice from '../../database/models/Invoice'

const updateStatusInvoice: GraphQLFieldConfig<unknown, unknown> = {
  type: invoiceType,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLInt),
    },
    status: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_, args) => {
    const invoice = await new Invoice().findById(args.id)

    if (!invoice) {
      throw new Error('No invoice was found')
    }

    try {
      await new Invoice().update(args.id, {
        ...invoice,
        status: args.status,
      })

      return await new Invoice().findOne(args.id)
    } catch (error) {
      throw new Error('There was an error updating the invoice')
    }
  },
}

export default updateStatusInvoice
