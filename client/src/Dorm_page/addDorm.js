import React, { useEffect, useState } from "react";
import "./addDorm.css";
import Navbar from "../component/NavbarOwner";
import Axios from "axios";
import Auth from "../service/authService.js";
import { Redirect,useHistory } from "react-router-dom";
import authHeader from "../service/auth-header.js";
import Indorm from "../component/Dorm/Indorm.js";

const Adddorm = () => {

  const [dorm, setDorm] = useState([]);
  const currentUser = Auth.getCurrentUser();
  const history = useHistory();
  if (!currentUser) {
    return <Redirect to="/login" />;
  } else {
    if (!currentUser == "ผู้ประกอบการ") {
      return <Redirect to="/login" />;
    }
  }

  return (
    <div className="owner-container">
      <Navbar />
      <Indorm/>
    </div>
  );
};

export default Adddorm;
