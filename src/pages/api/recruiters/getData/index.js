import recruitersModel from "@/model/recruiters.model"

export default function GET(req, res) {
    recruitersModel.selectAll()
    .then((result)=> {
        res.json({message: result});
    })
    .catch((err)=> {
        res.json({message: err.message});
    });
}