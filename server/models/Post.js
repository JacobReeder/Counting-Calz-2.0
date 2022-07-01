const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const postSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 240
    },
   calories: {
     type: Number,
     required: true, 
   },
   date_time: {
     type: String,
     required: true,
     get: (dateData) => dateFormat.apply(dateData)
   },
    user_id: {
      type: String,
      required: true,
    }
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    }
  }
);

// add virtual to format date before entering database

const Post = model('Post', postSchema);

module.exports = Post;