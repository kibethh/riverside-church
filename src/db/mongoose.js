const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace(
 '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
const DB = process.env.MONGODB_URL;

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
