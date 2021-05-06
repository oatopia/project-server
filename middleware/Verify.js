import jsonwebtoken from 'jsonwebtoken'
import {jwtSecret} from '../config/Jwt-Config.js'

export const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    console.log("Token:",token);
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
  
    jsonwebtoken.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
          console.log("error verify",err)
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
    //   req.userId = decoded.id;
      console.log("decoded: ",decoded);
      next();
    });
  };