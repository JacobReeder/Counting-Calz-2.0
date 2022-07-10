const faker = require('faker');
const userSeeds = require('./userSeed.json');
const postSeeds = require('./postSeed.json');
const db = require('../config/connection');
const { Post, User } = require('../models');

db.once('open', async () => {
  try {
     Post.deleteMany({});
     User.deleteMany({});

     User.create(userSeeds);

    for (let i = 0; i < postSeeds.length; i++) {
      const { _id, postAuthor } =  Post.create(postSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: postAuthor }, //Should this be username or user_id?
        {
          $addToSet: {
            posts: _id,
          },
        }
      );
    }
  } catch (seeder) {
    console.error(err);
    process.exit(1);
  }
  console.log('all done!');
  process.exit(0);
});