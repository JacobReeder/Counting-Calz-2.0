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
};
  
  module.exports = resolvers;