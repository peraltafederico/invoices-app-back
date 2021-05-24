import { GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql'

const paymentTermType = new GraphQLObjectType({
  name: 'PaymentTerm',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
    },
    days: {
      type: GraphQLNonNull(GraphQLInt),
    },
  }),
})

export default paymentTermType
