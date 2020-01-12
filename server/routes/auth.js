import express from 'express'
import employeesController from '../controllers/employees_controller'
import authValidations from '../middlewares/auth_middleware';
const routes = express.Router()

routes
  .post('/signup', authValidations.validateUser, authValidations.exists, employeesController.signup)
  .post('/signin', authValidations.validateSignin, employeesController.signin)
  .get('/activation/:token', employeesController.activateEmployeeAccount)
  .post('/reset', employeesController.requestPasswordReset)
	.put('/reset/:token', authValidations.validatePasswordReset, employeesController.updateUserPassword);

export default routes;
