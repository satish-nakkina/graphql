const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Query {
    coins(skip: Int!, limit: Int!, currency: String!): [Coin!]!
  }

  type Coin {
    id: ID!
    name: String!
    symbol: String!
    price: Float!
  }
`;
