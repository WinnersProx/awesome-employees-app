import express from 'express';
import authRouter from './auth';
import employeesRouter from './employees';

const router = express.Router();

router.use('/api', router);
router.use('/auth', authRouter);
router.use('/', employeesRouter);

router.get('/api', (req, res) => {
  res.status(200).send({message : `Welcome to AwesomeEmployees`})
});

export default router;
