import jwt from 'jsonwebtoken';
import User from '../models/user';
import userHelper from '../helpers/user_helper';
import mailer from '../config/mailer';

const employeesController = {

  create : async (req, res) => {
    const plain = req.body.password;
    req.body.password = userHelper.hashPassword(req.body.password);
    let user = await User.createEmployee(req.body, true);
    const { email, full_name } = user;

    mailer.sendActivationEmailToEmployee({ email, full_name, password : plain });
    return res.status(201).json({
      success: true,
      message: "Account created successfully, the employee has been notified"
    });
  },
  find : async (req, res) => {
    const { query } = req.body;
    const employee = await User.findEmployee(query);

    if(employee){
      employee.password = undefined;
      return res.status(200).json({
        success: true,
        result: employee
      });
    }

    return res.status(200).json({
      success: true,
      message: "No employee could be found"
    });
  },
  activateEmployee: async (req, res) => {
    const { employee } = req.params;
    const { email, full_name } = await User.activate(+employee);

    return res.status(200)
      .json({ success: true, message: "user activated successfully", data: {email, full_name}});
  },
  editEmployee: async (req, res) => {
    const { employee } = req.params;
    const { email, full_name, national_id, phone } = req.body;
    const userExists = await User.userExists({ email, national_id, phone });
    if( userExists ){
      if(userExists.id === +employee){
        return res.status(400)
          .json({ success: false, 
            error: "Account already taken, use a unique(phone number, email and national_id)"
          });
      }
    }
    await User.updateEmployee({ email, full_name, national_id, phone, employee });

    return res.status(200).json({ success: true, message: "Employee account edited successfully"});
  },
  suspendEmployee: async (req, res) => {
    const { employee } = req.params;
    const { email, full_name } = await User.suspend(+employee);

    return res.status(200)
      .json({ success: true, message: "user suspended successfully", data: {email, full_name}});
  },
  deleteEmployee: async (req, res) => {
    const { employee } = req.params;
    
    await User.delete(+employee);

    return res.status(200)
      .json({ success: true, message: "employee deleted successfully"});
  }

}

export default employeesController
