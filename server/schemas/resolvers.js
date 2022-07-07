const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Post } = require('../models');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('posts')
    
        return userData;
      }
    
      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('posts');
     
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('post');
        
    },

    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ /*createdAt: -1*/ });
    },
    
    post: async (parent, { _id }) => {
      return Post.findOne({ _id });
    }
  }
  ,
  Mutation: {
    // works
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    /*  Variables   
    {
      "email": "null@test.com",
      "password": "12345",
      "username": "null"
    } */
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    /*  Variables
    {
      "email": "null@test.com",
      "password": "12345"
    } */

    // WIP
    addPost: async (parent, args, context) => {
      if (context.user) {
        const post = await Post.create({ ...args, user_id: context.user._id })
          
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { posts: post._id } },
          { new: true }
        );
  
        return post
      }
      throw new AuthenticationError('You need to be logged in!');

    },
    /*  Variables
    {  
      "description": "test",
      "calories": 12345,
      "dateTime": "12345",
    } */

    // WIP
    // updatePost: async (parent, postId, context) => {
    //   if (context.user) {
    //     const updatedPost = await Post.findOneAndUpdate(
    //       { _id: postId },
    //       { $push: { post : { description, username: context.user.username } } },
    //       { new: true }
    //     )
    //     return updatedPost
    //   }
    // },

    // Works
    addGoal: async (parent, { goal }, context) => {

      if (context.user) {
        const updatedGoal = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { goal: goal },
        )
        return updatedGoal
      }
      throw new AuthenticationError('You need to be logged in!');

    },
    /*  Variables
    {
      goal: 123
    } */

    // Works
    deletePost: async (parent, { id }, context) => {
      if (context.user) {
        console.log('Post Deleted')
        return Post.findByIdAndDelete(id)
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    /*  
    Variables   
    {
      "deletePostId": "<post id>",
    } */
  }
};
  
  module.exports = resolvers;