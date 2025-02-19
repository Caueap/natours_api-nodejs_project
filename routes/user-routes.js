const express = require('express');
const userController = require('../controllers/user-controller');
const authController = require('../controllers/auth-controller');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// As middleware runs in sequence, all code below will
// use the authController.protect. So, there's no need
// to add authController.protect to each router below
router.use(authController.protect);

router.get(
  '/getCurrentUser',
  // authController.protect,
  userController.getCurrentUser,
  userController.getUser,
);

router.patch(
  '/updateCurrentUser',
  // authController.protect,
  userController.updateCurrentUser,
);

router.patch(
  '/updatePassword',
  // authController.protect,
  authController.updatePassword,
);

router.delete(
  '/deleteCurrentUser',
  // authController.protect,
  userController.deleteCurrentUser,
);

// Applying the same principle of line 13
router.use(authController.restrictTo('admin'));

router.route('/').get(userController.getAllUsers);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
