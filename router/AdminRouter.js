import express from 'express'
import {getUser,getFactor,deleteUser,createFactor,deleteFactor,updateUser,updateFactor} from '../controller/adminController.js'
import {upload} from '../middleware/upload.js'
const router = express.Router();


router.get('/user',getUser);
router.get('/factor',getFactor);
router.delete('/userDelete/:id',deleteUser);
// router.post('/saveFactor',upload.single("ImageFactor"),createFactor);
router.post('/saveFactor',createFactor);
router.delete('/factorDelete/:id',deleteFactor);
router.put('/updateFactor/:id',updateFactor);
router.put('/userUpdate/:id',updateUser);


export default router;
