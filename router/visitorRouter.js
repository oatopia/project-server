import express from 'express'
import {getfactor} from '../controller/visitorController.js'
const router = express.Router();


router.get('/getfactor',getfactor);
// router.get('/match',getall);
// router.get('/search',getall);
export default router;
