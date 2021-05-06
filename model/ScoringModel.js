import db from "../util/database.js";
import fs from "fs";
    db.query("SELECT * FROM Scoring_Factors ", (err, res) => {
        if (err) {
          console.log("error:", err);
          result(null, err);
          return;
        }
        console.log(res);
        fs.writeFile("Score_Drom.json", JSON.stringify(res), function (err) {
          if (err) throw err;
          console.log("save file sucsess!");
        });
      });

