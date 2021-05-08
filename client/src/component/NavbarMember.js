import React from "react";
import "./NavbarMember.css";
import logoapp from "../img/logoapp.png";
import homelogo from "../img/Home.png";
import userlogo from "../img/user.png";
import savelogo from "../img/savelogo.png";
import profilelogo from "../img/profile-user.png";
import { BrowserRouter, Route, Link, Router, Redirect,useHistory } from "react-router-dom";
import Auth from '../service/authService.js'

export default function Navbar() {
  const history = useHistory();
  const currentUser = Auth.getCurrentUser();

  const gotohome = () => {
    history.push("/member");
  };

  
  const logout =()=>{
    Auth.logout();
    history.push("/");
  }
  // console.log("navbar curretnuser: ",currentUser);
  return (
    <div className="NavMember-container">
      <img
        src={logoapp}
        className="logoapp"
        width="200"
        height="100"
        onClick={gotohome}
      ></img>
    <div className="NavMember-container2">
      <ul className="listmenu-Navbarmember">
        <img
          src={homelogo}
          className="homelogo-Navbarmember"
          width="40"
          height="38"
          onClick={gotohome
          }></img>
        <Link to="/">หน้าหลัก </Link>
        <img src={savelogo} className="savelogo" width="38" height="39" ></img>
        <Link to="/login">รายการหอพักที่บันทึก</Link>
        </ul>
        <div className="profile-Navbarmember">
            <img src={profilelogo} className="profilelogo" width="35" height="36" ></img>
          <p>{currentUser.username}</p>
        </div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
