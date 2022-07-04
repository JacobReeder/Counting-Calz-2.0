const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Post } = require('../models');

const resolvers = {
  Query: {
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
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
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
    addPost: async (parent, args, context) => {
      if (context.user) {
        const post = await Post.create({ ...args, username: context.user.username });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { post: post._id } },
          { new: true }
        );

        return thought;
        }
        throw new AuthenticationError('You need to be logged in!');
      },
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
    addGoal: async (parent, context) => {
      if (context.user) {
        const updatedGoal = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { goal: context.goal }},
          { new: true },
        )
        return updatedGoal
      }
    },

    // deletePost: async (parent, context) => {
    //   if (context.user) {
    //     const deletedPost = await Post.findOneAndDelete({ _id: post._id })
    //   }
      
    //   console.log('Post deleted')
    // },
  }
};
  
  module.exports = resolvers;