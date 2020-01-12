import Model from '../models/index';
import comparePassword from '../helpers/user_helper';
import pool from '../config/db.config';

class UserModel extends Model{
  constructor(){
    super();
  }
  async createEmployee(datas, position = false){
    const { email, full_name, national_id, password, phone, birth_date } = datas;
    position = position ? 'employee' : 'manager';
    const queryString = {
      text: `INSERT INTO employees
            (email, full_name, national_id, password, phone, birth_date, position)
            VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING*;`,
      values: [email, full_name, national_id, password, phone, birth_date, position]
    };
    
    const { rows } = await pool.query(queryString);

    return rows[0];
  }
  async findEmployee(query){
    const queryString = {
      text : `SELECT * FROM employees WHERE email=$1 OR national_id=$1 OR phone=$1`,
      values : [query] 
    }
    const { rows } = await pool.query(queryString);
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
  async activate(employee){
    const queryString = {
      text : `UPDATE employees SET status=$1 WHERE id=$2 RETURNING*`,
      values : [1, employee]
    }
    const { rows } = await pool.query(queryString);
    return rows[0];
  }
  async suspend(employee){
    const queryString = {
      text : `UPDATE employees SET status=$1 WHERE id=$2 RETURNING*`,
      values : [0, employee]
    }
    const { rows } = await pool.query(queryString);
    return rows[0];
  }
  async delete(employee){
    const queryString = {
      text : `DELETE FROM employees WHERE id=$1`,
      values : [employee]
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
  async updateEmployee({ email, full_name, national_id, phone, employee }){
    const queryString = {
      text : `UPDATE employees SET email=$1, full_name=$2, national_id=$3, phone=$4 WHERE id=$5 RETURNING*`,
      values : [email, full_name, national_id, phone, employee]
    }
    const { rows } = await pool.query(queryString);
    return rows[0];
  }



}

export default new UserModel();

