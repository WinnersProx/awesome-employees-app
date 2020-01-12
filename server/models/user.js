import Model from '../models/index';
import comparePassword from '../helpers/user_helper';
import pool from '../config/db.config';

class UserModel extends Model{
  constructor(){
    super();
  }
  async createEmployee(datas){
    const { email, full_name, national_id, password, phone, birth_date } = datas;
    const queryString = {
      text: `INSERT INTO employees
            (email, full_name, national_id, password, phone, birth_date)
            VALUES($1, $2, $3, $4, $5, $6) RETURNING*;`,
      values: [email, full_name, national_id, password, phone, birth_date]
    };
    
    const { rows } = await pool.query(queryString);
    const firstUser = await this.first();

    return rows[0];
  }
  async first(){
    const queryString = {
      text: `SELECT id,email FROM employees LIMIT 1;`,
      values: []
    };
    const { rows } = await pool.query(queryString);
    return rows[0];
  }
  async activateAccount({ email }){
    const queryString = {
      text : `UPDATE employees SET status=$1 WHERE email=$2 RETURNING*`,
      values : [1, email]
    }
    const { rows } = await pool.query(queryString);
    return rows[0];
  }
  async updatePassword({ password, email }) {
    const queryString = {
      text : `UPDATE employees SET password=$1 WHERE email=$2 RETURNING*`,
      values : [password, email]
    }
    const { rows } = await pool.query(queryString);
    return rows[0];
  }
  async userExists({email, national_id, phone}){
    const queryString = {
      text : `SELECT email FROM employees WHERE email=$1 OR national_id=$2 OR phone=$3`,
      values : [email, national_id, phone] 
    }
    const { rows } = await pool.query(queryString);
    return rows.length;
  }
  async updateUser(datas, userId){
    const { email, first_name, last_name, address, phone } = datas;
    const queryString = {
      text : `UPDATE employees SET email=$1,first_name=$2, last_name=$3, address=$4, phone=$5 WHERE id=$6 RETURNING*`,
      values : [email,first_name,last_name,address,phone,userId]
    }
    const { rows } = await pool.query(queryString);
    return rows[0];
  }
}

export default new UserModel();

