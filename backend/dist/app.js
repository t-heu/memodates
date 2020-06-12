"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = require("express");
const apollo_server_express_1 = require("apollo-server-express");
const resolvers_1 = require("./interface/graphql/resolvers");
const typeDefs_1 = require("./interface/graphql/typeDefs");
const typeorm_1 = require("./infra/database/typeorm");
const routes_1 = require("./interface/rest/routes");
require("./container");
const app = express();
typeorm_1.default();
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: typeDefs_1.default,
    resolvers: resolvers_1.default,
    context: ({ req, res }) => ({ req, res })
});
server.applyMiddleware({ app, cors: false });
app.use(express.json());
app.use(routes_1.default);
app.listen(process.env.PORT || 3333);
console.log(`🚀  Server ready`);
//# sourceMappingURL=app.js.map