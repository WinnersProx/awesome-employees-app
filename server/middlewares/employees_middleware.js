import Joi from '@hapi/joi';
import jwt from 'jsonwebtoken';
import userHelper from '../helpers/user_helper';
import User from '../models/user';

const employeeSchema = Joi.object().keys({
  id : Joi.number().integer(),
  email : Joi.string().email({minDomainSegments : 2}).required(),
  password : Joi.string().min(6),
  full_name : Joi.string().min(6).max(20).required(),
  national_id  : Joi.string().min(16).max(16).required(),
  phone: Joi.string().min(13).max(13).required(),
  birth_date: Joi.date(),
  position: Joi.string().min(6),
  status: Joi.number().integer(),
  created_on : Joi.date()
});
export default  {
  validateQuery : (req, res, next) => {
    let { query } = req.body;

    if(query){
      query = String(query).trim();
      if(!(query.length >= 3))
        return res.status(400).json({ success: false, error: "The query should have minimum 6 characters"});
    }
    else{
      return res.status(400).json({ success: false, error: "You should provide a valid query"});
    }

    next();
  },
  isValidEmployee: async (req, res, next) => {
    const { employee } = req.params;

    if(! +employee)
      return res.status(400).json({ success: false, error: "Invalid employee provided"});

    // check whether a given employee exists based on his id
    if(! await User.findbyField('id', 'employees', +employee))
      return res.status(404).json({ success: false, error: "Employee not found!"});
    next();
  },  

  canbeEdited: async (req, res, next) => {
    const { phone } = req.body;
    let { error } = Joi.object().keys({
      email : Joi.string().email({minDomainSegments : 2}).required(),
      full_name : Joi.string().min(6).max(20).required(),
      national_id  : Joi.string().min(16).max(16).required(),
      phone: Joi.string().min(13).max(13).required(),
    }).validate(req.body);

    if(phone && ! phone.startsWith('+250'))
        return res.status(400).json({success:false, error: 'Please use rwanda country code :(+250)'});

    if(error){
      error = error.details[0].message;
      return res.status(400).json({success:false, error});
    }
    next();
  },

}