
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const {ApolloServer,AuthenticationError} =require("apollo-server")
const typeDefs=`
type Library {
    branch:String!
    books:[Book!]
}
type Book{
    title:String!
    author:Author!
}
type Author {
    name:String!
}
type Query {
    libraries:[Library]
}
`
const libraries = [
    {
      branch: 'downtown'
    },
    {
      branch: 'riverside'
    },
  ];
  
  // The branch field of a book indicates which library has it in stock
  const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
      branch: 'riverside'
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
      branch: 'downtown'
    },
  ];
const resolvers={
  Query:{
      libraries(){
          return libraries;
      }
  },
  Library:{
      books(parent){
          return books.filter(book=>book.branch===parent.branch);
      }
  },
  Book:{
      author(parent){
          return {
              name:parent.author
          }
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
    ],
    context:({req})=>{
      if(req.headers['auth']==="user")
       return {}
      else
      throw new AuthenticationError('Invalid user')
    }
  })
  
  server
    .listen()
    .then(({ url }) =>
      console.log(`Server is running on ${url}`)
    );