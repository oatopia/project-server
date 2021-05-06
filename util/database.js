import mysql from "mysql";
import config from "../config/config.js";
import fs from "fs";

const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  connectionLimit: 15,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("sucsessfully");
  connection.query("SELECT * FROM Scoring_Factors ", (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log(res);
      fs.w;
      fs.writeFile("Score_Dorm.txt", JSON.stringify(res), (err) => {
        if (err) return err;
        console.log("save!");
      });
    }
  });
});

export default connection;
