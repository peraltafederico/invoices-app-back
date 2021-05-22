import express, { Request, Response } from 'express'
import { graphqlHTTP } from 'express-graphql'
import schema from './schema'
import database from './database/connection'

const app = express()

app.get('/', (req: Request, res: Response) => {
  res.send('Hello cxz!')
})

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
  })
)

app.listen(3000, async () => {
  await database.migrate.latest()

  console.log('Graphql server now up at port 3000')
})
