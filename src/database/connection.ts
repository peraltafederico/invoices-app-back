import knex from 'knex'
import knexStringcase from 'knex-stringcase'
import config from '../../knexfile'

const database = knex(knexStringcase(config.development))

export default database
