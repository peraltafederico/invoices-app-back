import {
  GraphQLFieldConfig,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql'
import { nanoid } from 'nanoid'
import inputItemType from '../types/inputItemType'
import invoiceType from '../types/invoiceType'
import Invoice, { InvoiceProps } from '../../database/models/Invoice'
import Item, { ItemProps } from '../../database/models/Item'

const createInvoice: GraphQLFieldConfig<unknown, unknown> = {
  type: invoiceType,
  args: {
    billFromStreet: {
      type: GraphQLNonNull(GraphQLString),
    },
    billFromCity: {
      type: GraphQLNonNull(GraphQLString),
    },
    billFromPostCode: {
      type: GraphQLNonNull(GraphQLString),
    },
    billFromCountry: {
      type: GraphQLNonNull(GraphQLString),
    },
    billToName: {
      type: GraphQLNonNull(GraphQLString),
    },
    billToEmail: {
      type: GraphQLNonNull(GraphQLString),
    },
    billToStreet: {
      type: GraphQLNonNull(GraphQLString),
    },
    billToCity: {
      type: GraphQLNonNull(GraphQLString),
    },
    billToPostCode: {
      type: GraphQLNonNull(GraphQLString),
    },
    billToCountry: {
      type: GraphQLNonNull(GraphQLString),
    },
    description: {
      type: GraphQLNonNull(GraphQLString),
    },
    status: {
      type: GraphQLNonNull(GraphQLString),
    },
    date: {
      type: GraphQLNonNull(GraphQLString),
    },
    paymentTermId: {
      type: GraphQLNonNull(GraphQLInt),
    },
    items: {
      type: GraphQLNonNull(GraphQLList(inputItemType)),
    },
  },
  resolve: async (_, args) => {
    const { items, ...newInvoice } = args as InvoiceProps & {
      items: ItemProps[]
    }

    try {
      const [id] = await new Invoice().create({
        ...newInvoice,
        bussinessId: nanoid(6),
      })

      if (items) {
        const asd = await new Item().createBulk(items, id)

        console.log('asd', asd)
      }

      return await new Invoice().findOne(id)
    } catch (error) {
      throw new Error(error || 'There was an error creating the invoice')
    }
  },
}

export default createInvoice
