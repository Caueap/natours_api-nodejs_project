const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
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
});

app.post('/api/v1/tours', (req, res) => {
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
});

app.patch('/api/v1/tours/:id', (req, res) => {
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
});

app.delete('/api/v1/tours/:id', (req, res) => {
  if (parseInt(req.params.id) > tours.length) {
    res.status(404).json({
      status: 'Failure',
      message: 'Invalid ID',
    });
  } else {
    res.status(204).json({
      status: 'success',
      data: null
    });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
