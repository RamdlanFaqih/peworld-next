import multer from "multer";
import path from "path";
import cloudinary from "../../../config/cloudinary";
import { log } from "console";
import PUT from "@/pages/api/workers/updateProfile";

//simpanFile

const multerUpload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./public");
        },
    limits: {
        fileSize: 5000000 // 1000000 Bytes = 1 MB
        },
        
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const fileName = `${Date.now()}${ext}`;
            cb(null, fileName);
        }
    }),
    
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
            cb(null, true);
    }
    else {
        const error = {
            message: "file must be .png, .jpg or .jpeg"
        };
        cb(error, false);
        }
    }
});

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result); // Jika hasilnya adalah error, reject dengan error tersebut
        } 
         return resolve(result); // Jika tidak ada error, resolve dengan hasilnya
      });
    });
  }

  async function POST(req, res) {
    try {
        await runMiddleware(req, res, multerUpload.single("image"))
        const image = await cloudinary.uploader.upload(req.file.path);


        console.log(req.file)
    } catch (e) {

    }
    return res.json({ message: 'Image Upload !'})
  }

  export const config = {
    api: {
        bodyParser: false,
    }
  }

  export default PUT