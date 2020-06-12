"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs = apollo_server_1.gql `
  type User {
    id: ID!
    yourBirthday: String!
    email: String!
    name: String!
    birthday: [Birthday]
    password: String
    acess_token: String
  }

  # enum SocialNetwork {
  #   FACEBOOK
  #   EMAIL
  # }

  type Birthday {
    id: ID
    name: String
    date: String
  }

  type Query {
    profile: User
  }

  # input inputBirthday {
  #   name: String
  #   date: String
  # }

  type Mutation {
    signup(email: String!, password: String!, yourBirthday: String!, name: String!): User
    signin(email: String!, password: String!): User
    oauth(access_token: String!, TypeServiceOauth: String!): User
    createBirthday(name: String!, date: String!, idExist: String): Birthday
  }
`;
exports.default = typeDefs;
//# sourceMappingURL=typeDefs.js.map