import express, { Request, Response } from 'express'
import { graphqlHTTP } from 'express-graphql'
import dotenv from 'dotenv'
import cors from 'cors'
import schema from './schema'
import database from './database/connection'

dotenv.config()

const app = express()

app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello dasdsa!')
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

  // eslint-disable-next-line no-console
  console.log(`Graphql server now up at port ${process.env.PORT || 3000} :)`)
})
