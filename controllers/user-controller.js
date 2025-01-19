const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`),
);

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'Success',
    results: users.length,
    data: {
      users: users,
    },
  });
};

exports.getUser = (req, res) => {
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

exports.createUser = (req, res) => {
  const newId = '5c8a' + Math.random();
  const newUser = Object.assign({ id: newId }, req.body);

  users.push(newUser);

  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    () => {
      res.status(201).json({
        satus: 'success',
        data: {
          user: newUser,
        },
      });
    },
  );
};

exports.updateUser = (req, res) => {
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

exports.deleteUser = (req, res) => {
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
