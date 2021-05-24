/* eslint-disable @typescript-eslint/no-explicit-any */
import { Knex } from 'knex'
import database from '../connection'

export default class Model<T> {
  model: Knex.QueryBuilder<any, T>

  constructor(table: string) {
    this.model = database(table)
  }

  create(data: T | T[]) {
    return this.model.insert(data)
  }

  update(id: string | number, data: Partial<T>) {
    return this.model.update(data).where({ id })
  }

  destroy(id: string | number) {
    return this.model.del().where({ id })
  }

  findAll(columnsNeeded?: string[]) {
    return this.model.select<any, Partial<T>[]>(columnsNeeded || '*')
  }

  find(where: any, columnsNeeded?: string[]) {
    return this.findAll(columnsNeeded).where(where)
  }

  findOne(where: any, columnsNeeded?: string[]) {
    return this.find(where, columnsNeeded).first<any, Partial<T>>()
  }

  findById(id: string | number, columnsNeeded?: string[]) {
    return this.model
      .select<any, Partial<T>>(columnsNeeded || '*')
      .where({ id })
      .first()
  }
}
