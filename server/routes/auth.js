import express from 'express'
import authController from '../controllers/auth_controller'
import authValidations from '../middlewares/auth_middleware';
const routes = express.Router()

routes
  .post('/signup', authValidations.validateUser, authValidations.exists, authController.signup)
  .post('/signin', authValidations.validateSignin, authController.signin)
  .get('/activation/:token', authController.activateEmployeeAccount)
  .post('/reset', authController.requestPasswordReset)
	.put('/reset/:token', authValidations.validatePasswordReset, authController.updateUserPassword);

export default routes;
