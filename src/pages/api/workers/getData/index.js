import workersModel from "../../../../model/workers.model"

export default function GET(req, res) {
    workersModel
      .selectAll()
      .then((result) => {
        res.json({ message: result });
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
}