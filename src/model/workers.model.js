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
  updateData: ({
    workers_id,
    name,
    email,
    phone_number,
    password,
    role,
    image,
    profession,
    residence,
    workplace,
    workers_desc,
    work_category,
    github_url,
    instagram_url,
    gitlab_url
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE workers SET name='${name}', email='${email}', phone_number='${phone_number}', password='${password}', role=${role}, image='${image}', profession='${profession}', residence='${residence}', workplace='${workplace}', workers_desc='${workers_desc}', work_category='${work_category}', github_url='${github_url}', instagram_url='${instagram_url}', gitlab_url='${gitlab_url}' WHERE workers_id=${workers_id}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  updateProfilePicture: ({
    workers_id,
    image
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE workers SET image='${image}' WHERE workers_id=${workers_id}`,
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
