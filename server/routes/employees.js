import express from 'express'
import authValidations from '../middlewares/auth_middleware';
import employeesValidations from '../middlewares/employees_middleware';
import employeesController from '../controllers/employees_controller';

const routes = express.Router()

routes
	.post('/employees/search', employeesValidations.validateQuery, authValidations.checkUserToken, authValidations.isManager, employeesController.find)
  .post('/employees', authValidations.validateUser, authValidations.exists, authValidations.checkUserToken, authValidations.isManager, employeesController.create)
  .put('/employees/:employee/activate', employeesValidations.isValidEmployee, authValidations.checkUserToken, authValidations.isManager, employeesController.activateEmployee )
  .put('/employees/:employee', employeesValidations.canbeEdited, employeesValidations.isValidEmployee, authValidations.checkUserToken, authValidations.isManager, employeesController.editEmployee)
  .put('/employees/:employee/suspend', authValidations.checkUserToken, employeesValidations.isValidEmployee, employeesController.suspendEmployee)
  .delete('/employees/:employee', authValidations.checkUserToken, employeesValidations.isValidEmployee, employeesController.deleteEmployee);

export default routes;
