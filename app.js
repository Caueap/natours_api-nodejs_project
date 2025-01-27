const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/app-error');
const globalErrorHandler = require('./controllers/error-controller');
const tourRouter = require('./routes/tour-routes');
const userRouter = require('./routes/user-routes');

const app = express();

// MIDDLEWARES
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTERS MOUNT
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  const err = new AppError(`Can't find ${req.originalUrl}`, 404);

  next(err);
});

app.use(globalErrorHandler);

module.exports = app;
