import React, { useEffect, useState } from "react";
import "./Dorm_info.css";
import Axios from "axios";
import Auth from "../../service/authService.js";
import { Redirect, useHistory } from "react-router-dom";
import authHeader from "../../service/auth-header.js";
import { useLocation } from "react-router";

export default function Dorminfo() {
  const [dorm, setDorm] = useState([]);
  const [fac, setFac] = useState([]);
  const [img, setImg] = useState([]);
  const currentUser = Auth.getCurrentUser();
  const history = useHistory();
  const location = useLocation();
  const Dorm_ID = location.state;
  const [showedit, setShowedit] = useState(false);

  useEffect(() => {
    Axios.post(
      "/api/dorm/getDormdatabyId",
      { Dorm_ID: Dorm_ID },
      { headers: authHeader() }
    ).then((Response) => {
      console.log("Response dorm: ", Response.data);
      setDorm(Response.data[0]);
    });

    Axios.post(
      "/api/dorm/getFac",
      { Dorm_ID: Dorm_ID },
      { headers: authHeader() }
    ).then((Response) => {
      console.log("Response fac: ", Response.data);
      setFac(Response.data);
    });

    Axios.post(
      "/api/dorm/getImg",
      { Dorm_ID: Dorm_ID },
      { headers: authHeader() }
    )
      .then((Response) => {
        console.log("Response image: ", Response.data);
        setImg(Response.data);
      })
      .catch((error) => {
        console.log("Error from get Factor", error);
      });
  }, []);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
      <div className="box-info">
        <h1>{dorm.Dorm_Name}</h1>
        {img.map((pic) => {
          return (
            <img
              className="img-dorm-data"
              src={"http://localhost:4000/img_Dorm/" + pic.Image}
            />
          );
        })}
        <div className="box-inner-data">
          <p>ประเภทหอพัก {dorm.Type_D}</p>
          <p>ที่อยู่ {dorm.Address}</p>
          <h2>รายละเอียดค่าใช้จ่าย</h2>
          <p>ค่าส่วนกลาง {dorm.Deposit}</p>
          <p>ค่าไฟ {dorm.Electric_Bill}</p>
          <p>ค่าน้ำ {dorm.Water_Bill}</p>
          <p>ค่าประกัน {dorm.Common_fee}</p>
        </div>
        <h2>สิ่งอำนวยความสะดวก</h2>
        <div className="box-fac-data">
          <div className="fac-in-room">
            <h3>ภายในห้องพัก</h3>
            <ul>
              {fac.map((fa) => {
                if (fa.Type_F == "ภายในห้องพัก") return <li>{fa.Facility}</li>;
              })}
            </ul>
          </div>

          <div className="fac-central">
            <h3>ส่วนกลาง</h3>
            <ul>
              {fac.map((fa) => {
                if (fa.Type_F == "ส่วนกลาง") return <li>{fa.Facility}</li>;
              })}
            </ul>
          </div>
        </div>
        <div className="box-2-inner-data">
        <p>รายละเอียดหอพัก {dorm.Common_fee}</p>
        <h2>ข้อมูลติดต่อ</h2>
        <p>ชื่อผู้ดูแลหอพัก {dorm.L_name}</p>
        <p>เบอร์ติดต่อ {dorm.Contact_Number}</p>
        <p>อีเมล {dorm.E_mail}</p>
        <p>lineid {dorm.Line_ID}</p>
        </div>
      </div>
  );
};



