import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema, Resolver, Query } from 'type-graphql'
import * as express from 'express'

@Resolver()
class HelloResolver {
  @Query(() => String)
  async hello() {
    return 'Hello World!'
  }
}

const main = async () => {
  const schema = await buildSchema({
    resolvers: [
      HelloResolver,
    ],
  })

  const apolloServer = new ApolloServer({
    schema,
  })

  const app = express()

  await apolloServer.start()

  apolloServer.applyMiddleware({ app })

  app.listen(4000, () => {
    console.log('Server started at http://localhost:4000/graphql')
  })
}
  

main()



