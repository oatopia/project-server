import { React, useEffect, useState } from "react";
import "./resultmatch.css";
import NavbarMember from "../component/NavbarMember.js";
import Axios from "axios";
import { useLocation } from "react-router";
import bookon from "../img/bookon.png";
import bookoff from "../img/bookoff.png";
import Auth from "../service/authService.js";
import authHeader from "../service/auth-header.js";

function ResultMatch() {
  var location = useLocation();
  const state = location.state;
  const currentUser = Auth.getCurrentUser();
  console.log("hi", state);
  const [mark, setMark] = useState([]);
  const [bookstate, setBookState] = useState([]);
  useEffect(() => {
    Axios.post(
      "/api/match/getBookmark",
      { user_id: currentUser.user_id },
      { headers: authHeader() }
    )
      .then((Response) => {
        console.log("Book mark dorm: ", Response.data);
        let res = Response.data;
        if (res.length > 0) {
          setMark(res);
          for (let i = 0; i < res.length; i++) {
            setBookState([
              ...bookstate,
              { Dorm_ID: res[i].Dorm_ID, status: true },
            ]);
            console.log("data in bookstate:", bookstate);
          }
        }
      })
      .catch((error) => {
        console.log("Error from get Bookmark", error);
      });
  }, []);
  //   const [search,setSearch] = useState("");

  //   const searchFac = (e) => {
  //     e.preventDefault();
  //     console.log(search)
  //     Axios.post('/api/match/searchDorm',{
  //       Search:search
  //     })
  //     .then(Response => {
  //         console.log(Response);
  //     }).catch(error=>{
  //         console.log(error);
  //     })
  //   }

  const handleonclick = (e,data) => {
    let stateinside = false;
    let mid = 0;
    mark.map((item) => {
      if (item.Dorm_ID == data.Dorm_ID) {
        stateinside = true;
        mid = item.M_ID;
      }
    });
    if (stateinside == true) {
      e.target.setAttribute("src", bookoff);
      let id = mid;
      Axios.delete(`/api/match/deletebook/${id}`, {
        headers: authHeader(),
      })
        .then((Response) => {
          console.log("data from delete Book mark dorm: ", Response.data);
          setMark(
            mark.filter((item) => {
              return item.M_ID != id;
            })
          );
        })
        .catch((error) => {
          console.log("Error from save bookmark", error);
        });
      stateinside = false;
    } else {
      e.target.setAttribute("src", bookon);
      const payload = {
        user_id: currentUser.user_id,
        Dorm_ID: data.Dorm_ID,
      };
      Axios.post("/api/match/createbook", payload, {
        headers: authHeader(),
      })
        .then((Response) => {
          console.log("Book mark dorm: ", Response.data);
          setMark([
            ...mark,
            {
              M_ID: Response.data.insertId,
              user_id: currentUser.user_id,
              Dorm_ID: data.Dorm_ID,
            },
          ]);
        })
        .catch((error) => {
          console.log("Error from save bookmark", error);
        });
      stateinside = true;
    }
  };

  return (
    <div className="contain-match">
      <NavbarMember></NavbarMember>
      <div className="content-resultmatchpage">
        {state.map((data, key) => {
          var checkstate = false;
          console.log("Index", key);
          if (mark.length > 0) {
            mark.map((item) => {
              if (item.Dorm_ID == data.Dorm_ID) {
                checkstate = true;
                console.log("checkstate", checkstate);
              }
            });
          }
          return (
            <div className="Dorm-block" key={key}>
              <label>{data.Dorm_Name}</label>
              <img
                src={checkstate ? bookon : bookoff}
                width="50px"
                height="50px"
                onClick={(e)=>{handleonclick(e,data)}}
              ></img>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ResultMatch;
