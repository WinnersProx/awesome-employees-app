import express from 'express';
import apiRouter from './server/routes/';
import swaggerUi from 'swagger-ui-express';
import authentication from './server/middlewares/authentication';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2020;

app.use(cors());
app.use(express.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(authentication.initialize());

app.use(apiRouter);

app.use('**', (req, res) => res.status(404).send({
  status : "error",
  error  : `The requested resource was not found on the server`
}));

app.listen(PORT, () => {
  console.log(`AwesomeEmployees is listening to you on port : ${PORT}`)
});

export default app;
