const mongoose = require('mongoose');

// const DB = process.env.MONGODB_URL;
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.once('open', () => {
  console.log('MongoDB Connected');
});
mongoose.connection.on('error', (err) => {
  console.error(err);
});
