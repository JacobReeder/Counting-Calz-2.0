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

# removed duplicate "type Post" which didn't have the date_time either
  
  type Auth {
    token: ID!
    user: User
  }

  type Post {
    _id: ID
    description: String
    calories: Int
    date_time: String
    user_id: String
  }
 
  type Query {
    me: User
    users: [User]
    user(email: String!): User
    posts(email: String): [Post]
    post(_id: ID!): Post
  }
  
  type Mutation {
    login(
      email: String!, 
      password: String!
    ): Auth

    addUser(
      username: String!, 
      email: String!, 
      password: String!
      goal: Int
    ): Auth

    addPost(
      user_id: String!,
      description: String!, 
      calories: Int!, 
      date_time: String!, 
    ): Post

    addGoal(
      goal: Int!
    ): User

    deletePost(
      id: String
    ): Post
  }
`;


//    Note: Post cannot accept -  
        //**Put back into Post once completed
        // date_time: String **Put back into post once completed

//    Note: User cannot accept -
        //**Put back into Post once completed
        //posts: [Post]         
        //goal: Int


module.exports = typeDefs;
