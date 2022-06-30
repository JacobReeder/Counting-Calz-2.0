const { Schema, model } = require('mongoose');

const postSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 240
    },
   // calories: {        **Commented out: Throws error; integer not define
   //   type: Integer,
   //   required: true, 
   // },
  //  date_time: {   **Commented out; need to complete this 
   //   type: String,
   //   required: true,
  //  },
    user_id: {
      type: String,
      required: true,
    }
  },
  {
    toJSON: {
      virtuals: true,
    }
  }
);

// add virtual to format date before entering database

const Post = model('Post', postSchema);

module.exports = Post;