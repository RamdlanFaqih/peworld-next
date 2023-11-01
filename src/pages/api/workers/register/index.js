import workersModel from "@/model/workers.model";
import bcrypt from "bcrypt";

export default async function POST(req, res) {
  const { name, email, phone_number, password, role = 1 } = req.body;
  bcrypt.hash(password, 10, function (err, hash) {
    if (err) {
      res.json({ message: "error hash password" });
    } else {
      const data = {
        name,
        email,
        phone_number,
        password: hash,
        role,
      };
      console.log(data);
      workersModel
        .registerWorkers(data)
        .then((result) => {
          res.json({
            Data: result,
            message: "Insert data berhasil",
          });
        })
        .catch((err) => {
          res.json({ message: err.message });
        });
    }
  });
}
