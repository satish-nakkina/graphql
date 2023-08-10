const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Query {
    hello: String
    products(filter:Filter): [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
  }

  type Mutation{
    addCategory(input: AddCategoryInput):Category!
    addProduct(input:AddProductInput):Product!
    deleteCategory(id:ID!):Boolean!
    updateCategory(id:ID!,input:UpdateCategoryInput!):Category!
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    image: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    category: Category
    reviews:[Review!]!
  }

  type Category {
    id: ID!
    name: String!
    products: [Product!]!
  }

  type Review{
    id:ID!
    date:String!
    title:String!
    comment:String!
    rating: Int!
  }

  input Filter{
    onSale:Boolean
  }

  input AddCategoryInput{
    name: String
  }

  input AddProductInput{
    name: String!
    description: String!
    image: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    categoryId:String!
  }

  input UpdateCategoryInput{
    name: String!
  }
`;
