import jwt from 'jsonwebtoken';
import User from '../models/user';
import userHelper from '../helpers/user_helper';
import mailer from '../config/mailer';

const employeesController = {
  signup : async (req, res) => {
    req.body.password = userHelper.hashPassword(req.body.password);
    let user = await User.createEmployee(req.body);
    const { email, full_name } = user;

    mailer.sendActivationEmail({ email, full_name });
    return res.status(201).json({
      success: true,
      message: "Account created successfully, check your emails to activate your account"
    });
  },
  signin : (req,res) => {
    const { email, first_name, last_name, address, phone, role } = req.user;
    const token = userHelper.authenticateUser({email});
    userHelper.respond(res, 200, "success", "signed in successfully", {
      email,
      first_name,
      last_name,
      address,
      phone,
      role,
      token
    });
  },
  alterRole : async (req, res) => {
    const { user_id } = req.params;
    const { role } = req.body;
    const newRole = await User.setUserRole(+(role), +(user_id));
    userHelper.respond(res, 200, "success", "user role altered successfully");
  },
  viewUserProfile : async (req, res) => {
    const { user_id } = req.params;
    const user = await User.findbyField("id", "users", +(user_id));
    const { email, first_name, last_name, phone, address, role } = user;
    userHelper.respond(res, 200, "success", undefined, {
      email,
      first_name,
      last_name,
      phone,
      address,
      role
    });
  },
  updateProfile : async (req, res) => {
    const { id } = req.user;
    console.log(req.body);
    const user = await User.updateUser(req.body, +(id));
    const { email, first_name, last_name, phone, address, role } = user;
    const token = userHelper.authenticateUser({email});
    userHelper.respond(res, 200, "success", "Profile updated successfully", {
      email,
      first_name,
      last_name,
      phone,
      address,
      role,
      token
    });
  },
  viewUsers : async (req, res) => {
    let users = await User.findAll("users");
    users = users.map(user => {
      user.password = undefined;
      return user;
    });
    userHelper.respond(res, 200, "success", undefined, users);
  },
  activateEmployeeAccount: async (req, res) => {
    const { token } = req.params;
    const { SECRET } = process.env;
    console.log(jwt.verify(token, SECRET));
    try{
      if(! token)
        return res.status(400).send({ success: false, error: "Wrong link provided!"});

      const  { email }  = jwt.verify(token, SECRET);
      
      if(! await User.activateAccount({ email }))
        return res.status(500).json({ success: false, message: "Your account couldn't be activated, try again!"})
      else
        return res.status(201).json({ success: true, message : 'user account activated succesfully, you can now login!'});
    }
    catch(error)
    {
      return res.status(403).send({success: false, error});
    }
  },
  requestPasswordReset: async (req, res) => {
    const  { email }  = req.body; 

    if(! email) 
      return res.status(400).json({ success: false, error : "Provide your valid email please!"});

    if(! await User.findbyField('email', 'employees', email))
      return res.status(404).json({ success: false, error: "User not found"});

    mailer.sendResetEmail({ email });

    return res.status(200).json({
      success: true,
      message: "password reset initiated, look for an email from us to proceed"
    });

  },

  updateUserPassword: async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const { SECRET } = process.env;

    try{
      const  { email }  = jwt.verify(token, SECRET);

      if(! await User.updatePassword({ email, password }))
        return res.status(500).json({success: false, error: 'Could not update password, try again!'})
      else  
        return res.status(201).json({ success: true, message : 'User password reset succesfully!'});
    }
    catch(error)
    {
      return res.status(403).send({success: false, error});
    }
  },


}

export default employeesController
