const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.log('uncaught exception:', err);
  console.log('SHUTDOWN BY UNCAUGHT EXCEPTION');
  process.exit(1);
});

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection successfull');
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('unhandled promise rejection:', err.name, err.errmsg);
  console.log('SHUTDOWN BY UNHANDLED PROMISE REJECTION');
  server.close(() => process.exit(1));
});
