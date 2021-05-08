import React from "react";
import "./Navbar.css";
import logoapp from "../img/logoapp.png";
import homelogo from "../img/Home.png";
import userlogo from "../img/user.png";
import { BrowserRouter, Route, Link, Router, Redirect } from "react-router-dom";

export default function Navbar() {
  const gotohome = () => {
    window.location.href = "/";
  };
  return (
    <div className="Nav">
      <img
        src={logoapp}
        className="logoapp"
        width="200"
        height="100"
        onClick={gotohome}
      ></img>

      <ul className="listmenu">
        <img
          src={homelogo}
          className="homelogo"
          width="33px"
          height="31px"
          onClick={gotohome}
        ></img>
        <Link to="/" className="linkhead">
          หน้าหลัก
        </Link>
        <img
          src={userlogo}
          className="userlogo"
          width="33px"
          height="32px"
          onClick={() => {
            window.location.href = "/login";
          }}
        ></img>
        <Link to="/login" className="linkhead">
          เข้าสู่ระบบ
        </Link>
        <button
          className="sign"
          onClick={() => {
            window.location.href = "/register";
          }}
        >
          สมัครสมาชิก
        </button>
      </ul>
    </div>
  );
}
