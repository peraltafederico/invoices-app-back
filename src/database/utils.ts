import { Knex } from 'knex'

export const validateEmptyTable = async (
  knex: Knex,
  tableName: string
): Promise<boolean> => {
  const result = await knex(tableName).select().limit(1)

  return result.length === 0
}

export const random = (array: (string | number)[]) =>
  array[Math.floor(Math.random() * array.length)]
