import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

const itemType = new GraphQLObjectType({
  name: 'Item',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
    qty: {
      type: GraphQLNonNull(GraphQLInt),
    },
    price: {
      type: GraphQLNonNull(GraphQLString),
    },
  }),
})

export default itemType
