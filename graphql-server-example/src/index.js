const {ApolloServer} =require("apollo-server")
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

const typeDefs=`
type Query {
    numberSix:Int!
    numberSeven:Int!
}
`
const resolvers={
    Query:{
        numberSix(){
            return 6;
        },
        numberSeven(){
            return 7;
        }
    }
}
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({
          // options
        })
      ]
  })
  
  server
    .listen()
    .then(({ url }) =>
      console.log(`Server is running on ${url}`)
    );