const express = require('express');
const userController = require('../controllers/user-controller');
const authController = require('../controllers/auth-controller');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
  '/updateCurrentUser',
  authController.protect,
  userController.updateCurrentUser,
);

router.patch(
  '/updatePassword',
  authController.protect,
  authController.updatePassword,
);

router.delete(
  '/deleteCurrentUser',
  authController.protect,
  userController.deleteCurrentUser,
);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser);
// .delete(userController.deleteUser);

module.exports = router;
