import passport from 'passport';
import Joi from '@hapi/joi';
import userHelper from '../helpers/user_helper';
import User from '../models/user';

const employeesSchema = Joi.object().keys({
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
  validateUser : (req, res, next) =>{
    const validateMe = employeesSchema.validate(req.body);
    const { phone, birth_date, national_id } = req.body;
    let { error } = validateMe;

    if(phone && ! phone.startsWith('+250'))
        return res.status(400).json({success:false, error: 'Please use rwanda country code :(+250)'});

    //  validate national id
    if(error){
      error = error.details[0].message;
      return userHelper.respond(res, 400, "error", error);
    }

    // checks whether a given national id is a valid rwandan one
    if(! +(national_id) )
      return res.status(400).json({success: false, error: "You should provide a valid rwandan national id" });

    // validate employee majority
    if(! userHelper.isMajor(birth_date))
      return res.status(400).json({ success: false, error : "Sorry, you're not eligible to register!"});

    next();
  },
  validateSignin : async (req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password){
      return userHelper.respond(res, 400, "error", 'All fields are required "(email and password)"');
    }
    else{
      let user = await User.findbyField('email', 'employees', email);
      if(!user){
        return userHelper.respond(res, 404, "error", "user not found");
      }
      else{
        if(!userHelper.comparePasswords(password, user.password))
          return userHelper.respond(res, 400, "error","your password is invalid");
      }
      req.user = user;
    }
    next();
  },
  checkUserToken: async (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
      // user informations can be accessed on req object as req.user
      req.user = user;
      if (err) {
        return userHelper.respond(res, 520, "error", err.message);
      }
      // check whether the token is in headers
      if (!user) {
        return userHelper.respond(res, 401, "error", 'No provided token or invalid one provided');
      }
      next();
    })(req, res, next);
  },
  exists : async (req, res, next) => {
    const { email, national_id, phone } = req.body;
    const user = await User.userExists({email, national_id, phone});
    if(user){
      return userHelper.respond(res, 400, "error",  "Account already taken, use a unique email, national_id and phone number!");
    }
    next();
  },
  isManager : (req, res, next) => {
    const { position } = req.user;
    if(position !== 'manager')
      return userHelper.respond(res, 403, "error", "You are not allowed to access this resource");
    
    next();
  },
  ValidateUserId : async (req, res, next) => {
    const { user_id } = req.params;
    const validate = Joi.number().integer().required().validate(user_id);
    let {error} = validate;
    if(error){
      error = error.details[0].message;
      return userHelper.respond(res, 400, "error", error);
    }
    else{
      const user = await User.findbyField("id", "users", +(user_id));
      if(!user){
        return userHelper.respond(res, 404, "error","user does not exist");
      }
    }
    next();
  },
  validatePasswordReset: (req, res, next) => {
    const { password, password_confirm } = req.body;
    const { token } = req.params;

    if(password && password_confirm)
    {
      if(password.length < 6)
        return res.status(400).json({ success: false, error: "short password, use at least 6 characters"});
      
      if(password !== password_confirm)
        return res.status(400).json({ success: false, error: "password and password confirmation should match"});
    }
    else{
      return res.status(400).json({success:false, error: "Provide password and confirm it!"});
    }

    if(! token)
      return res.status(403).json({ success: false, error: "You should provide a valid link"});
    
    next();
  },
}
