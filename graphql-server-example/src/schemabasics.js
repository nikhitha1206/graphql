const {ApolloServer} =require("apollo-server")
const typeDefs=`
  type Course {
      id:ID
      courseName:String
      category:String
      price:Int
      language:String
      email:String
      teachingAssists:[TeachAssist]
  }
  type TeachAssist{
      firstName:String
      lastName:String
      experience:Int
  }
  enum Stack{
      WEB
      MOBILE
      OTHER
  }
  type Query{
      getCourse(id:ID):Course
  }
  input CourseInput{
    id:ID
    courseName:String!
    category:String
    price:Int!
    language:String
    email:String
    teachingAssists:[TeachAssist]!  
  }
  input TeachAssistInput{
    firstName:String
    lastName:String
    experience:Int
  }
  type Mutation{
      createCourse(input:CourseInput):Course
  }
`

const resolvers={
   
}
const server = new ApolloServer({
    typeDefs,
    resolvers,
  })
  
  server
    .listen()
    .then(({ url }) =>
      console.log(`Server is running on ${url}`)
    );