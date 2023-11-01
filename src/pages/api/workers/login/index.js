import workersModel from "@/model/workers.model";
import { generateToken } from "@/config/jwt";
import bcrypt from "bcrypt";

export default async function POST(req, res) {
  const { email, password } = req.body;
  workersModel.loginWorkers(email).then((data) => {
    const workers_id = data.rows[0].workers_id;
    const workersRole = data.rows[0].role;
    const workersPassword = data.rows[0].password;
    if (data.rowCount > 0) {
      bcrypt.compare(password, workersPassword).then(async (result) => {
        console.log(result);
        if (result) {
          const token = await generateToken({
            role: workersRole,
          });
          res.json({
            message: "LOGIN BERHASIL",
            generateToken: token,
            workers_id: workers_id,
            role: workersRole,
          });
        } else {
          res.json({
            message: "LOGIN GAGAL",
          });
        }
      });
    }
  });
}
