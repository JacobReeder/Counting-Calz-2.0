const mongoose = require('mongoose');
// commented out when preparing the heroku buildout
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/countingcalz', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// should be proper connection set up
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/countingcalz',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;