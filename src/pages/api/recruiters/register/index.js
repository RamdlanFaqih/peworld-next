import recruitersModel from "@/model/recruiters.model";
import bcrypt from "bcrypt";

export default async function POST(req, res) {
  const {
    name,
    email,
    company,
    job_position,
    phone_number,
    password,
    role = 0,
  } = req.body;
  bcrypt.hash(password, 10, function (err, hash) {
    if (err) {
      res.json({ message: "error hash password" });
    } else {
      const data = {
        name,
        email,
        company,
        job_position,
        phone_number,
        password: hash,
        role,
      };
      console.log(data);
      recruitersModel
        .registerRecruiters(data)
        .then((result) => {
          res.json({
            data: result,
            message: "Insert data berhasil",
          });
        })
        .catch((err) => {
          res.json({ message: err.message });
        });
    }
  });
}
