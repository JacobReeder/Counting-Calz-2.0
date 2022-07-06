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

    // works
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
      // if (context.user) {

      // }
      // throw new AuthenticationError('You need to be logged in!');

      const post = await Post.create({ ...args, username: context.user._id })
        
      await User.findByIdAndUpdate(
        { _id: context.user._id || args.userId },
        { $push: { posts: post._id } },
        { new: true }
      );

      return post
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

    // WIP
    addGoal: async (parent, context) => {
      // if (context.user) {

      // }
      // throw new AuthenticationError('You need to be logged in!');

      const updatedGoal = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $push: { goal: context.goal }},
        { new: true },
      )
      return updatedGoal
    },
    /*  Variables
    {
      
    } */

    // Works
    deletePost: async (parent, { id }) => {
      return Post.findByIdAndDelete(id)
    },
    /*  
    Variables   
    {
      "deletePostId": "62c24947f43d0e792c2619a1",
    } */
  }
};
  
  module.exports = resolvers;