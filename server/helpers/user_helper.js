import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
const comparePasswords = (plain, encrypted) => {
  return bcrypt.compareSync(plain, encrypted) ? true : false;
}
const authenticateUser = ({email}) => {
  const { SECRET } = process.env;
  return jwt.sign({
    email
  },
  SECRET,
  { expiresIn : (3600 * 24) * 365}) // expires in a year
}
const respond = (res, statusCode, statusText, message, data = undefined) => {
  return statusText !== "error" 
    ? res.status(statusCode).send({
      status : statusCode,
      message,
      data
    })
    : res.status(statusCode).send({
      status : statusCode,
      error : message
    })
}


const isMajor = date => {
  const currentYear = new Date().getFullYear();
  const birthDate = new Date(date).getFullYear();

  return (currentYear - birthDate ) >= 18;
}

export default { 
  hashPassword, 
  comparePasswords, 
  authenticateUser, 
  respond, 
  isMajor
};
