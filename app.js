const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/users.json`)
);

// Route Handlers

// Tours
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

const getTour = (req, res) => {
  const id = parseInt(req.params.id);
  const tour = tours.find((el) => el.id === id);

  if (tours.find((el) => el.id === id)) {
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } else {
    res.status(404).json({
      status: 'Failure',
      message: 'Invalid ID',
    });
  }
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        satus: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (parseInt(req.params.id) > tours.length) {
    res.status(404).json({
      status: 'Failure',
      message: 'Invalid ID',
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        tour: '<Updated tour goes here>',
      },
    });
  }
};

const deleteTour = (req, res) => {
  if (parseInt(req.params.id) > tours.length) {
    res.status(404).json({
      status: 'Failure',
      message: 'Invalid ID',
    });
  } else {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
};

// Users
const getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'Success',
    results: users.length,
    data: {
      users: users,
    },
  });
};

const getUser = (req, res) => {
  const id = req.params._id;
  const user = users.find((el) => el.id === id);

  if (!user) {
    res.status(404).json({
      status: 'Failure',
      message: 'User does not exist',
    });
  } else {
    res.status(200).json({
      status: 'Success',

      data: {
        user: user,
      },
    });
  }
};

const createUser = (req, res) => {
  const newId = '5c8a' + Math.random();
  const newUser = Object.assign({ id: newId }, req.body);

  users.push(newUser);

  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      res.status(201).json({
        satus: 'success',
        data: {
          user: newUser,
        },
      });
    }
  );
};

const updateUser = (req, res) => {
  if (parseInt(req.params.id) > users.length) {
    res.status(404).json({
      status: 'Failure',
      message: 'Invalid ID',
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        user: '<Updated user goes here>',
      },
    });
  }
};

const deleteUser = (req, res) => {
  if (parseInt(req.params.id) > users.length) {
    res.status(404).json({
      status: 'Failure',
      message: 'Invalid ID',
    });
  } else {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
};

// Routes

// Tours

// Old route implementation

// app.route('/api/v1/tours').get(getAllTours).post(createTour);

// app
//   .route('/api/v1/tours/:id')
//   .get(getTour)
//   .patch(updateTour)
//   .delete(deleteTour);

// New route implementation

const tourRouter = express.Router();
tourRouter.route('/').get(getAllTours).post(createTour);

tourRouter
.route('/:id')
.get(getTour)
.patch(updateTour)
.delete(deleteTour);

app.use('/api/v1/tours', tourRouter);
///////////////////////////////////////////////////////////////////


// Users

// Old route implementation

// app.route('/api/v1/users').get(getAllUsers).post(createUser);

// app
//   .route('/api/v1/users/:id')
//   .get(getUser)
//   .patch(updateUser)
//   .delete(deleteUser);

// New route implementation

const userRouter = express.Router();
userRouter.route('/').get(getAllUsers).post(createUser);

userRouter
.route('/:id')
.get(getUser)
.patch(updateUser)
.delete(deleteUser);

app.use('/api/v1/users', userRouter)
/////////////////////////////////////////////////////////////////////  

// Server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
