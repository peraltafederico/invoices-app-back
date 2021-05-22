import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql'

const invoice = new GraphQLObjectType({
  name: 'Invoicsse',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLID),
      resolve: (source, args) => {
        console.log('source', source)
        console.log('args', args)
        return 'zxc'
      },
    },
  }),
})

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    invoisces: {
      type: invoice,
      args: {
        id: {
          type: GraphQLNonNull(GraphQLID),
        },
      },
      resolve: (source, args, context, info) => 'args.id',
    },
  }),
})

export default new GraphQLSchema({
  query,
})
