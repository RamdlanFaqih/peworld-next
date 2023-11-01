import db from "../config/db";

const workersModel = {
  selectAll: () => {
    return db.query(
      `
            SELECT * FROM workers 
        `
    );
  },
  selectByWorkers_ID: (workers_id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM workers WHERE workers_id = ${workers_id}`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  registerWorkers: ({ name, email, phone_number, password, role }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO workers(name, email, phone_number, password, role) VALUES 
              ('${name}', '${email}', '${phone_number}', '${password}', ${role})`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  loginWorkers: (email) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM workers WHERE email = '${email}'`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
};

module.exports = workersModel;
