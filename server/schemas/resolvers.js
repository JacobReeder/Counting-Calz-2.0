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
    // works
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

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

    // WIP
    addPost: async (parent, args, context) => {
      if (context.user) {
        const post = await Post.create({ ...args })
        
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { posts: post._id, description: args.description } },
          { new: true }
        )

        return post
      }
    },
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
      if (context.user) {
        const updatedGoal = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { goal: context.goal }},
          { new: true },
        )
        return updatedGoal
      }
    },

    // WIP
    deletePost: async (parent, { id }) => {
      return Post.findByIdAndDelete(id)
    },
  }
};
  
  module.exports = resolvers;