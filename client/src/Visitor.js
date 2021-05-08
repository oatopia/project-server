import React from "react";
import "./Visitor.css";
import Navbar from "./component/Navbar";
import Match from "./component/Match";
import Showfactor from './component/showfactor.js'


function Visitor() {
  return (
    <div className="parrent-contain">
      <div className="appcontainer">
        <div className="sticky">
        <Navbar></Navbar>
        </div>
      </div>
      <div className="searchbar-Visitor">
        <input className="searchinput-Visitor" placeholder="ค้นหาหอพัก..."></input>
        <button className="searchbutton-Visitor">ค้นหา</button>
      </div>
      <div className="match-container">
        {/* <Match /> */}
        <Showfactor/>
      </div>
    </div>
  );
}

export default Visitor;
