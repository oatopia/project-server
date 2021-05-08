import React, { useEffect, useState } from "react";
import "./owner.css";
import Navbar from "../component/NavbarOwner";
import Axios from "axios";
import backgroundimg from "../img/operatorbackground.jpg";
import Auth from "../service/authService.js";
import { Redirect, useHistory } from "react-router-dom";
import authHeader from "../service/auth-header.js";

const Owner = () => {
  const [dorm, setDorm] = useState([]);
  const currentUser = Auth.getCurrentUser();
  const history = useHistory();
  useEffect(() => {
    Axios.post(
      "/api/dorm/getDorm",
      { user_id: currentUser.user_id },
      { headers: authHeader() }
    )
      .then((Response) => {
        console.log("Response dorm: ", Response.data);
        setDorm(Response.data);
        console.log("dorm: ", dorm);
      })
      .catch((error) => {
        console.log("Error from get Factor", error);
      });
  }, []);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  console.log("fuck dorm: ", dorm);
  return (
    <div className="owner-container">
      <Navbar />
      <div
        className="add-dorm"
        onClick={() => {
          history.push("/addDorm");
        }}
      >
        <h2 className="">เพิ่มข้อมูลหอพัก</h2>
      </div>
      <div className="contain-dorm">
        {dorm.map((item, key) => {
          return (
            <div
              className="box-dorm"
              key={key}
              onClick={() => {
                history.push({
                  pathname: "/dormdata",
                  state: item.Dorm_ID,
                });
              }}
            >
              <h3 className="h3-dorm">{item.Dorm_Name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Owner;
