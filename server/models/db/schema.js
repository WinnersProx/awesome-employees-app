import pool from '../../config/db.config';


const employeesTable = `
DROP TABLE IF EXISTS employees CASCADE;
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  email VARCHAR(200) NOT NULL,
  full_name VARCHAR(50) NOT NULL,
  national_id VARCHAR(16) NOT NULL,
  password VARCHAR(200) NOT NULL,
  birth_date DATE NOT NULL,
  phone VARCHAR(13) NOT NULL,
  position VARCHAR(10) DEFAULT 'manager',
  status INTEGER DEFAULT 0,
  created_on DATE DEFAULT NOW()
);
`;

const queryString = `
${employeesTable}
`;

(async () => {
  try {
    await pool.query(queryString);
  } catch (error) {
    if (error) {
      console.log(error);
      return { error };
    };
  }
})();
