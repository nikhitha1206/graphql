const {ApolloServer}=require("apollo-server")
const { ApolloServerPluginLandingPageDisabled } = require('apollo-server-core');

const typeDefs=`
type User {
    id: ID!
    name: String
  }
  
  type Query {
    user(id: ID!): User
    users:[User]
  }
  type Mutation{
    user(id:ID,name:String):User
    updateUser(id:ID,name:String):User
    deleteUser(id:ID):User
  }
`
const users = [
    {
      id: '1',
      name: 'Nikhitha'
    },
    {
      id: '2',
      name: 'Anusha'
    }
  ];
const resolvers={
    Query:{
        user(parent, args, context, info) {
            return users.find(user => user.id === args.id);
          },
          users(){return users;

          }  
    },
    Mutation:{
      user:(parent,args)=>{
        const user={
          id:args.id,
          name:args.name
        }
        users.push(user)
        return user
      },
      updateUser:(parent,args)=>{
        u=users.find(user => user.id === args.id)
        u.name=args.name
        return u
      },
     deleteUser:(parent,args)=>{
     console.log(args.id)
     delete users[args.id-1]
    }
  }
  
}
const server = new ApolloServer({
    typeDefs,
    resolvers,
    /*Disabling  Landing Page
    plugins: [
      ApolloServerPluginLandingPageDisabled()
    ]*/
  })
  
  server
    .listen()
    .then(({ url }) =>
      console.log(`Server is running on ${url}`)
    );