import { React, useEffect, useState } from "react";
import Axios from "axios";
import "./Match-member.css";
import { useHistory } from "react-router-dom";
import authHeader from "../service/auth-header.js";
import Auth from "../service/authService.js";

export default function Match() {
  const [factorlist, setFactorlist] = useState([]);
  const [weight, setWeight] = useState([]);
  const [getweight, setGetweight] = useState([]);
  var history = useHistory();
  const currentUser = Auth.getCurrentUser();
  const [GETResponse, setGETResponse] = useState(false);
  const [state, setState] = useState(false);

  useEffect(() => {
    Axios.get("/api/match/getfactor", { headers: authHeader() })
      .then((Response) => {
        console.log(Response.data);
        setFactorlist(Response.data);
      })
      .catch((error) => {
        console.log("Error from get Factor", error);
      });
    Axios.post(
      "/api/match/getWeight",
      { user_id: currentUser.user_id },
      { headers: authHeader() }
    )
      .then((Response) => {
        console.log("Respone from get weight", Response.data);
        if (Response.data.length > 0) {
          console.log("Get!!!!");
          setWeight(Response.data);
          setGETResponse(true);
          setState(true);
        } else {
          console.log("not get!!!");
          setGETResponse(false);
          setState(false);
        }
      })
      .catch((err) => {
        console.log("Error from get Weight", err);
      });
  }, []);

  const saveweight = () => {
    if (state == false) {
      const arrayweight = [];
      for (let i = 0; i < weight.length; i++) {
        weight.map((data) => {
          if (data.index_compare == i) {
            arrayweight.push(data);
          }
        });
      }
      console.log("save weight: ", arrayweight);
      const payload = {
        user_id: currentUser.user_id,
        data: arrayweight,
      };
      Axios.post("/api/match/createweight", payload, { headers: authHeader() })
        .then((Response) => {
          console.log(Response.data);
          setState(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("edit getweight save: ", weight);
      const payload = {
        user_id: currentUser.user_id,
        data: weight,
      };
      Axios.put("/api/match/editWeight", payload, { headers: authHeader() })
        .then((Response) => {
          console.log(Response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const addImage = (index) => (e) => {
    if (weight.length > 0) {
      var check = false;
      var INDEX = 0;
      for (let i = 0; i < weight.length; i++) {
        if (weight[i].index_compare == index) {
          check = true;
          INDEX = i;
        }
      }
      if (check == true) {
        const newWeight = [...weight];
        console.log("check true comparator: ", newWeight);
        newWeight[INDEX].comparator = e.target.value;
        setWeight(newWeight);
      } else {
        setWeight([
          ...weight,
          { comparator: e.target.value, weight: "1", index_compare: index },
        ]);
        console.log(weight);
      }
    } else {
      setWeight([
        { comparator: e.target.value, weight: "1", index_compare: index },
      ]);
      console.log(weight);
    }
  };

  const addWeight = (index) => (e) => {
    if (weight.length > 0) {
      var check = false;
      var INDEX = 0;

      for (let i = 0; i < weight.length; i++) {
        if (weight[i].index_compare == index) {
          check = true;
          INDEX = i;
        }
      }

      if (check == true) {
        const newWeight = [...weight];
        console.log("check true weight: ", newWeight);
        newWeight[INDEX].weight = e.target.value;
        setWeight(newWeight);
      } else {
        setWeight([
          ...weight,
          { comparator: "", weight: e.target.value, index_compare: index },
        ]);
        console.log(weight);
      }
    } else {
      setWeight([
        { comparator: "", weight: e.target.value, index_compare: index },
      ]);
    }
  };

  const showimage = () => {
    let index = 0;
    let array = [];
    for (let i = 0; i < factorlist.length; i++) {
      for (let j = i + 1; j < factorlist.length; j++) {
        array.push(
          <div id="contain-match-display" key={index}>
            <img
              value={factorlist[i].Image_factor}
              src={"http://localhost:4000/images/" + factorlist[i].Image_factor}
              width="70"
              height="70"
            ></img>
            <input
              value={factorlist[i].Id}
              type="radio"
              id="radio-1"
              name={index}
              onChange={addImage(index)}
            ></input>
            <img
              value={factorlist[j].Image_factor}
              src={"http://localhost:4000/images/" + factorlist[j].Image_factor}
              width="70"
              height="70"
            ></img>
            <input
              value={factorlist[j].Id}
              type="radio"
              id="radio-2"
              name={index}
              onChange={addImage(index)}
            ></input>
            <select
              className="select-score"
              defaultValue="1"
              onChange={addWeight(index)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
          </div>
        );
        index++;
      }
    }
    return array;
  };

  const onChangeWeight = (index) => (e) => {
    console.log(weight);
    let INDEX = 0;
    for (let i = 0; i < weight.length; i++) {
      if (weight[i].index_compare == index) {
        INDEX = i;
      }
    }
    const newWeight = [...weight];
    newWeight[INDEX].weight = e.target.value;
    setWeight(newWeight);

    // setWeight(
    //   weight.map((data) => {
    //     if (data.index_compare == index) {
    //       return { ...data, weight: e.target.value };
    //     }
    //   })
    // );
  };

  const onChangeFactor = (index) => (e) => {
    let INDEX = 0;
    for (let i = 0; i < weight.length; i++) {
      if (weight[i].index_compare == index) {
        INDEX = i;
      }
    }
    const newWeight = [...weight];
    newWeight[INDEX].comparator = e.target.value;
    setWeight(newWeight);
    // setWeight(
    //   weight.map((data) => {
    //     if (data.index_compare == index) {
    //       return { ...data, comparator: e.target.value };
    //     }
    //   })
    // );
  };

  const showfacwithWeight = () => {
    let index = 0;
    let array = [];
    for (let i = 0; i < factorlist.length; i++) {
      for (let j = i + 1; j < factorlist.length; j++) {
        array.push(
          <div id="contain-match-display" key={index}>
            <img
              value={factorlist[i].Image_factor}
              src={"http://localhost:4000/images/" + factorlist[i].Image_factor}
              width="70"
              height="70"
            ></img>

            <input
              value={factorlist[i].Id}
              type="radio"
              id="radio-1"
              name={index}
              onChange={onChangeFactor(index)}
              defaultChecked={factorlist[i].Id == weight[index].comparator}
            ></input>
            {/* {factorlist[i].Id == weight[index].comparator ? (
              <input
                value={factorlist[i].Id}
                type="radio"
                id="radio-1"
                name={index}
                onChange={onChangeFactor(index)}
                checked={}
              ></input>
            ) : (
              <input
                value={factorlist[i].Id}
                type="radio"
                id="radio-1"
                name={index}
                onChange={onChangeFactor(index)}
              ></input>
            )} */}

            <img
              value={factorlist[j].Image_factor}
              src={"http://localhost:4000/images/" + factorlist[j].Image_factor}
              width="70"
              height="70"
            ></img>

            <input
              value={factorlist[j].Id}
              type="radio"
              id="radio-2"
              name={index}
              onChange={onChangeFactor(index)}
              defaultChecked ={factorlist[j].Id == weight[index].comparator}
            ></input>
            {/* {factorlist[j].Id == weight[index].comparator ? (
              <input
                value={factorlist[j].Id}
                type="radio"
                id="radio-2"
                name={index}
                onChange={onChangeFactor(index)}
                checked
              ></input>
            ) : (
              <input
                value={factorlist[j].Id}
                type="radio"
                id="radio-2"
                name={index}
                onChange={onChangeFactor(index)}
              ></input>
            )} */}

            <select
              className="select-score"
              defaultValue={weight[index].weight}
              onChange={onChangeWeight(index)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
          </div>
        );
        index++;
      }
    }
    return array;
  };

  const matchFac = () => {
    Axios.post("/api/match/matchDorm", weight,{ headers: authHeader() })
      .then((Response) => {
        console.log(Response.data);
        history.push({
          pathname: "/resultmatch",
          state: Response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="containermatch">
      <div>
        <h1 id="header2">โปรดให้คะแนนระดับความสำคัญของปัจจัย ดังต่อไปนี้</h1>
        <div className="containermatch-2">
          {factorlist.map((data, key) => {
            return (
              <div className="detail" key={key}>
                <img
                  src={"http://localhost:4000/images/" + data.Image_factor}
                  width="50"
                  height="50"
                  id={key}
                ></img>
                <label>{data.Factor_name}</label>
              </div>
            );
          })}
        </div>
        <h3 id="header3">
          โปรดเลือกปัจจัยที่ท่านให้ความสำคัญมากที่สุดในแต่ละคู่
        </h3>
        <div className="containermatch-3">
          {GETResponse == false ? showimage() : showfacwithWeight()}
        </div>

        <button onClick={saveweight}>บันทึก</button>
        <button onClick={matchFac}>จับคู่หอพัก</button>
      </div>
    </div>
  );
}
