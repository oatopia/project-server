import userModel from "../model/userModel.js";
import jsonwebtoken from "jsonwebtoken";
import { jwtSecret} from '../config/Jwt-Config.js'
import bcrypt from "bcrypt-nodejs";


// create User
export const create = (req, res) => {
  const user = new userModel({
    username: req.body.username,
    password: req.body.password,
    type: req.body.type,
  });
  // userModel.validateUser(user.username);
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(user.password, salt);
  userModel.create(user, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.send(data);
    }
  });
  console.log(user);
};

export const login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
    console.log("Username: ",username,"|| Password: ",password);
  userModel.login(username, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      var passwordIsValid = userModel.validPassword(password,data[0].password);
      if (!passwordIsValid) {
        return res.send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      var token = jsonwebtoken.sign({ id: data[0].user_id }, jwtSecret, {
        expiresIn: 86400, // 24 hours
      });
      res.send({
        user_id: data[0].user_id,
        username: data[0].username,
        type: data[0].type,
        authen: true,
        accessToken: token
      });
      }
  });
};
