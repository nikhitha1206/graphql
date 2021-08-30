
import { GraphQLServer } from "graphql-yoga";
import { Query, Post, User, Picture, Mutation, Animal } from "./graphql/resolvers";

const server = new GraphQLServer({
    typeDefs: "./src/graphql/schema.graphql",
    resolvers: {
        Query,
        Post,
        User,
        Picture,
        Mutation,
        Animal
    }

});
server.start(() => {
    console.log("starting server")
})