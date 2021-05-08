import { React, useEffect, useState } from "react";
import Axios from "axios";
import "./Match.css";
import D1 from "../img/icon/D1.png";
import { useHistory } from "react-router";

export default function Match() {
  const [factorlist, setFactorlist] = useState([]);
  const [weight, setWeight] = useState([]);
  var history = useHistory();
  useEffect(() => {
    Axios.get("/api/match/getfactor", {}).then((Response) => {
      setFactorlist(Response.data);
    });
  }, []);

  const addWeight = (index) => (e) => {
    if (weight.length) {
      let have = "false";
      weight.map((item) => {
        if (item.Id == index) {
          return (have = "true");
        }
        return (have = "false");
      });
      if (have == "true") {
        let edit = weight.map((item) => {
          if (item.Id == index) {
            return { ...item, Weight: e.target.value };
          }
          return item;
        });
        setWeight(edit);
      } else {
        setWeight([
          ...weight,
          { Id: index, Image: "", Weight: e.target.value },
        ]);
        console.log(weight);
      }
    } else {
      setWeight([{ Id: index, Image: "", Weight: e.target.value }]);
    }
  };

  const addImage = (index) => (e) => { 
    if (weight.length > 0) {
      let have = "false";
      weight.map((item) => {
        if (item.Id == index) {
          return (have = "true");
        }
        return (have = "false");
      });
      if (have == "true") {
        let edit = weight.map((item) => {
          if (item.Id == index) {
            return { ...item, Image: e.target.value };
          }
          return item;
        });
        setWeight(edit);
      } else {
        setWeight([
          ...weight,
          { Id: index, Image: e.target.value, Weight: "1" },
        ]);
        console.log(weight);
      }
    } else {
      setWeight([{ Id: index, Image: e.target.value, Weight: "1" }]);
      console.log(weight);
    }
    // for(let i =0 ; i<weight.length;i++){
    //     if(index == weight[i].Id){
    //         let editimg = [...weight];
    //         editimg[i].Image = e.target.value;
    //         setWeight(editimg);
    //     }else{
    //         setWeight([...weight,{Id:index, Image:e.target.value, Weight:'1'}]);
    //     }
    // }
  };
  const showimage = () => {
    // let array = [];
    // for (let i = 0; i < factorlist.length; i++) {
    //     for (let j = i+1; j < factorlist.length; j++) {
    //         array.push(<img src={('http://localhost:4000/images/'+factorlist[i].Image_factor)} width="100" height="100"></img>);
    //         array.push(<img src={('http://localhost:4000/images/'+factorlist[j].Image_factor)} width="100" height="100"></img>);
    //         array.push(
    //             <select className="select-score" defaultValue="1">
    //                 <option value="1">1</option>
    //                 <option value="2">2</option>
    //                 <option value="3">3</option>
    //                 <option value="4">4</option>
    //                 <option value="5">5</option>
    //                 <option value="6">6</option>
    //                 <option value="7">7</option>
    //             </select>
    //         );
    //     }

    // }
    // return array;
    let index = 0;
    let array = [];
    for (let i = 0; i < factorlist.length; i++) {
      for (let j = i + 1; j < factorlist.length; j++) {
        array.push(
          <div id="contain-match-display" key={index}>
            <img
              className="img-match-visitor"
              value={factorlist[i].Image_factor}
              src={"http://localhost:4000/images/" + factorlist[i].Image_factor}
              width="70px"
              height="70px"
              onClick={addImage(index)}
            ></img>
            <input
              value={factorlist[i].Id}
              type="radio"
              id="radio-1"
              name={index}
              onChange={addImage(index)}
            ></input>
            <img
              className="img-match-visitor"
              value={factorlist[j].Image_factor}
              src={"http://localhost:4000/images/" + factorlist[j].Image_factor}
              width="70px"
              height="70px"
              onClick={addImage(index)}
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

  const matchFac = () => {
    Axios.post("/api/match/matchDorm", weight)
      .then((Response) => {
        console.log(Response.data);
        history.push({
          pathname: "/visitorResult",
          state: Response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="contentbox-visitor"> 
      <h1 className="header2-visitor">
        โปรดให้คะแนนระดับความสำคัญของปัจจัย ดังต่อไปนี้
      </h1>
      <div className="containermatch-visitor">
        {factorlist.map((data, key) => {
          return (
            <div key={key} className="detail-visitor">
              <img
                src={"http://localhost:4000/images/" + data.Image_factor}
                width="50"
                height="50"
              ></img>
              <p className="Fn-visitor">{data.Factor_name}</p>
            </div>
          );
        })}
      </div>
      <div className="containermatch2-visitor">{showimage()}</div>
      <div>
        <button onClick={matchFac} className="button-match-visitor">จับคู่หอพัก</button>
      </div>
    </div>
  );
}
