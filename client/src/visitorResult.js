import {React,useEffect,useState} from 'react';
import './visitorResult.css';
import Navbar from './component/Navbar.js';
import Axios from 'axios' 
import { useLocation } from 'react-router';
import './visitorResult.css'
import imagetest from './img/livingroom1.jpg'


function VisitorResult() {
  var location = useLocation();
  const state = location.state;
  console.log("sate match:",state);

return (
    <div className="contain-visitor-result">
      <Navbar></Navbar>
      <div className="content-visitor-result">
        {state.map((data)=>{
          return(
            <div className="visitor-dorm-block">
              <img src={imagetest} width="20%" height="100%"></img>
              <label>{data.Dorm_Name}</label>
            </div>
          )}
        )}
      </div>
    </div>
    );
}

export default VisitorResult;