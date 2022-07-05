const faker = require('faker');
const db = require('../config/connection');
const { Post, User } = require('../models');

db.once('open', async () => {
  await Post.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);


  //  await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
 // }

  // create thoughts
  // let createdPosts = [];
  // for (let i = 0; i < 100; i += 1) {
  //   const description = faker.lorem.words(Math.round(Math.random() * 20) + 1);

  //   const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
  //   const { username, _id: userId } = createdUsers.ops[randomUserIndex];

  //   const createdPost = await Post.create({ description, username });

  //   const updatedUser = await User.updateOne(
  //     { _id: userId },
  //     { $push: { posts: createdp._id } }
  //   );

  //   createdPosts.push(createdPost);
  // }

  // // create reactions
  // for (let i = 0; i < 100; i += 1) {
  //   const reactionBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

  //   const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
  //   const { username } = createdUsers.ops[randomUserIndex];

  //   const randomPostIndex = Math.floor(Math.random() * createdPosts.length);
  //   const { _id: postId } = createdPosts[randomPostIndex];

  //   await Post.updateOne(
  //     { _id: postId },
  //     { $push: {  username } },
  //     { runValidators: true }
  //   );
  // }

  console.log('all done!');
  process.exit(0);
});