import 'reflect-metadata';
import * as express from 'express'
import { ApolloServer } from 'apollo-server-express'

import resolvers from './interface/graphql/resolvers'
import typeDefs from './interface/graphql/typeDefs'
import createConnection from './infra/database/typeorm';
import routes from './interface/rest/routes'
import './container'

const app = express()

createConnection()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }: any) => ({ req, res })
})

server.applyMiddleware({ app, cors: false });

app.use(express.json())
app.use(routes)

// private GraphQL API
//app.use('/graphql', (req, res, next) => auth(req, res, next));

app.listen(process.env.PORT || 3333)
console.log(`🚀  Server ready`)
