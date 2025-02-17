const AppError = require('../utils/app-error');
const catchAsync = require('../utils/catch-async');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      const err = new AppError('No document found with that ID', 404);
      return next(err);
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

// exports.deleteTour = catchAsync(async (req, res, next) => {
//     const tour = await Tour.findByIdAndDelete(req.params.id);

//     if (!tour) {
//       const err = new AppError('No tour found with that ID', 404);
//       return next(err);
//     }

//     res.status(204).json({
//       status: 'success',
//       data: null,
//     });
//   });
