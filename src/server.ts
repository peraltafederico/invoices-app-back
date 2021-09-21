import express, { Request, Response } from 'express'
import { graphqlHTTP } from 'express-graphql'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import schema from './schema'
import database from './database/connection'

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
      specific: 'payment_terms.ts',
      directory,
    })

    await database.seed.run({
      specific: 'invoices.ts',
      directory,
    })

    await database.seed.run({
      specific: 'items.ts',
      directory,
    })
  }

  // eslint-disable-next-line no-console
  console.log(`Graphql server now up at port ${process.env.PORT || 3000} :)`)
})
