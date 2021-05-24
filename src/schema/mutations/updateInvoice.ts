import {
  GraphQLFieldConfig,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql'
import inputItemType from '../types/inputItemType'
import invoiceType from '../types/invoiceType'
import Invoice, { InvoiceProps } from '../../database/models/Invoice'
import Item, { ItemProps } from '../../database/models/Item'

const updateInvoice: GraphQLFieldConfig<unknown, unknown> = {
  type: invoiceType,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLInt),
    },
    billFromStreet: {
      type: GraphQLString,
    },
    billFromCity: {
      type: GraphQLString,
    },
    billFromPostCode: {
      type: GraphQLString,
    },
    billFromCountry: {
      type: GraphQLString,
    },
    billToName: {
      type: GraphQLString,
    },
    billToEmail: {
      type: GraphQLString,
    },
    billToStreet: {
      type: GraphQLString,
    },
    billToCity: {
      type: GraphQLString,
    },
    billToPostCode: {
      type: GraphQLString,
    },
    billToCountry: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    status: {
      type: GraphQLString,
    },
    date: {
      type: GraphQLString,
    },
    paymentTermId: {
      type: GraphQLInt,
    },
    items: {
      type: GraphQLList(inputItemType),
    },
  },
  resolve: async (_, args) => {
    const { items, ...editedInvoice } = args as Partial<InvoiceProps> & {
      id: string
    } & {
      items: ItemProps[]
    }

    const invoice = await new Invoice().findById(editedInvoice.id)

    if (!invoice) {
      throw new Error('No invoice was found')
    }

    try {
      await new Invoice().update(editedInvoice.id, {
        ...invoice,
        ...editedInvoice,
      })

      if (items) {
        await new Item().destroyAllFromInvoice(editedInvoice.id)
        await new Item().createBulk(items, editedInvoice.id)
      }

      return await new Invoice().findById(editedInvoice.id)
    } catch (error) {
      throw new Error('There was an error updating the invoice')
    }
  },
}

export default updateInvoice
