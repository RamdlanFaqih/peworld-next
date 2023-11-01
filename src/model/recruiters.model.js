import db from "@/config/db";

const recruitersModel = {
  selectAll: () => {
    return db.query(
      `SELECT * FROM recruiters`
    );
  },
  registerRecruiters: ({
    name,
    email,
    company,
    job_position,
    phone_number,
    password,
    role,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO recruiters(name, email, company, job_position, phone_number, password, role) VALUES 
          ('${name}', '${email}', '${company}', '${job_position}', '${phone_number}', '${password}', '${role}')`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  loginRecruiters: (email) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM recruiters WHERE email = '${email}'`,
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


module.exports = recruitersModel;