import workersModel from "../../../../model/workers.model"

export default async function GET(req, res) {
    const query = req.query
    const {workers_id} = query

    workersModel
    .selectByWorkers_ID(workers_id)
    .then((result) => {
      res.send({
        data: result,
      });
    })
    .catch((err) => {
      res.json({ message: err.message });
    });
}