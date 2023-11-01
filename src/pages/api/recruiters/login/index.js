import recruitersModel from "@/model/recruiters.model";
import { generateToken } from "@/config/jwt";
import bcrypt from "bcrypt";

export default async function POST(req, res) {
  const { email, password } = req.body;
  recruitersModel.loginRecruiters(email).then((data) => {
    const recruitersId = data.rows[0].recruiters_id;
    const recruitersRole = data.rows[0].role;
    const recruitersPassword = data.rows[0].password;
    if (data.rowCount > 0) {
      bcrypt.compare(password, recruitersPassword).then(async (result) => {
        console.log(result);
        if (result) {
          const token = await generateToken({
            role: recruitersRole,
          });
          res.json({
            message: "LOGIN BERHASIL",
            generateToken: token,
            recruiters_id: recruitersId,
            role: recruitersRole,
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
