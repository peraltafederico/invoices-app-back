import { GraphQLFieldConfig, GraphQLInt, GraphQLNonNull } from 'graphql'
import deletionType from '../types/deletionType'
import Invoice from '../../database/models/Invoice'

const deleteInvoice: GraphQLFieldConfig<unknown, unknown> = {
  type: deletionType,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: async (_, args) => {
    const { id } = args as {
      id: string
    }

    try {
      const hasBeenDeleted = await new Invoice().destroy(id)

      if (hasBeenDeleted) {
        return {
          id,
        }
      }
      throw new Error('No invoice has been found')
    } catch (error) {
      throw new Error(
        error.message || 'There was an error updating the invoice'
      )
    }
  },
}

export default deleteInvoice
