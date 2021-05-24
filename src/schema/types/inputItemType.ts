import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLString,
} from 'graphql'

const inputItemType = new GraphQLInputObjectType({
  name: 'InputItem',
  fields: () => ({
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

export default inputItemType
