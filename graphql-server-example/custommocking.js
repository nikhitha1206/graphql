const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello: String
    resolved: String
    person:Person
  }
  type Person{
      name:String
      age:Int
  }
`;

const resolvers = {
  Query: {
    resolved: () => 'Resolved',
  },
};

const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => 'Hello',
  Person: () => ({
    name: 'nikki',
    age: () => 21,
  }),
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks,
  mockEntireSchema:false
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});