import { GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql'
import { InvoiceProps } from '../../database/models/Invoice'

const deletionType = new GraphQLObjectType<InvoiceProps>({
  name: 'Deletion',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
    },
  }),
})

export default deletionType
