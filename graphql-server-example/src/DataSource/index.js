const { ApolloServer, gql } =require("apollo-server");
const fetch =require( "node-fetch");


const typeDefs = gql`
  type Person {
    gender: String
    email: String
    phone: String
    name: Name
    location:location
  }
  type Name{
      title:String!
      first:String!
      last:String!
  }
  type location{
      street:Street
  }
  type Street{
      number:Int!
      name:String!
  }
  type Query {
    randomPerson: [Person!]!
 
  }
`;

const resolvers= {
  Query:{
    randomPerson: async () => {
      const response = await fetch("https://api.randomuser.me/");
      const data = await response.json();
      return data.results;
    },
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
