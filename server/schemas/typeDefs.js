// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    posts: [Post]
    goal: Int
   
  }

  type Post {
    _id: ID
    description: String
    user_id: String
  }
  
 
  type Query {
    users: [User]
    user(email: String!): User
    posts(email: String): [Post]
    post(_id: ID!): Post
  }
`;


//calories: Int   **Put back into Post once completed
//    date_time: String **Put back into post once completed
// export the typeDefs
module.exports = typeDefs;
