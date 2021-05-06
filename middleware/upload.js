import path from 'path'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: "./public/img_factor/",
    filename: (req, file, cb)=>{
       cb(null,file.originalname);
    }
  });

export const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
 });
