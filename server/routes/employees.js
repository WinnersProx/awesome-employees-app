import express from 'express'
import authValidations from '../middlewares/auth_middleware';

const routes = express.Router()

routes
	.get('/employees/search', authValidations.checkUserToken)
  .post('/employees', authValidations.checkUserToken)
  .put('/employees/:employee/activate', authValidations.checkUserToken)
  .put('/employees/:employee', authValidations.checkUserToken)
  .put('/employees/:employee/suspend', authValidations.checkUserToken)
  .delete('/employees/:employee', authValidations.checkUserToken)

export default routes;
