import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'
import PaymentTerm from '../../database/models/PaymentTerm'
import { InvoiceProps } from '../../database/models/Invoice'
import Item from '../../database/models/Item'
import itemType from './itemType'
import paymentTermType from './paymentTermType'

const invoiceType = new GraphQLObjectType<InvoiceProps>({
  name: 'Invoice',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
    },
    bussinessId: {
      type: GraphQLNonNull(GraphQLString),
    },
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
    paymentTerm: {
      type: paymentTermType,
      resolve: ({ paymentTermId }) => new PaymentTerm().findById(paymentTermId),
    },
    items: {
      type: GraphQLList(itemType),
      resolve: ({ id }) => new Item().find({ id }),
    },
  }),
})

export default invoiceType
