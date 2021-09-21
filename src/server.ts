import express, { Request, Response } from 'express'
import { graphqlHTTP } from 'express-graphql'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import schema from './schema'
import database from './database/connection'
import { extension } from '../knexfile'

dotenv.config()

const app = express()

app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('Testing :)')
})

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
  })
)

app.listen(process.env.PORT || 3000, async () => {
  await database.migrate.latest()

  if (process.env.RUN_SEEDS !== 'false') {
    const directory = path.join(__dirname, 'database', 'seeds')

    await database.seed.run({
      specific: `payment_terms.${extension}`,
      directory,
    })

    await database.seed.run({
      specific: `invoices.${extension}`,
      directory,
    })

    await database.seed.run({
      specific: `items.${extension}`,
      directory,
    })
  }

  // eslint-disable-next-line no-console
  console.log(`Graphql server now up at port ${process.env.PORT || 3000} :)`)
})
