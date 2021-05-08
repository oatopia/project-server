import axios from "axios";
import { React, useState } from "react";
import "./Indorm.css";
import addImgicon from "../../img/Group 86.png";
import Auth from "../../service/authService.js";
import authHeader from "../../service/auth-header.js";
import { Redirect,useHistory } from "react-router-dom";

export default function Indorm() {
  const facilitiesinsidedorm = [
    "เครื่องปรับอากาศ",
    "เครื่องทำน้ำอุ่น",
    "ตู้เสื้อผ้า",
    "โซฟา",
    "โต๊ะ",
    "เก้าอี้",
    "อ่างล้างจาน",
    "โทรทัศน์",
    "เตียงเดี่ยว",
    "เตียงคู่",
    "ตู้เย็น",
    "ไมโครเวฟ",
    "อินเตอร์เน็ตไร้สาย",
    "โทรศัพท์สายตรง",
    "ตู้เก็บของ",
  ];
  const facilitiescenter = [
    "ลิฟท์",
    "ที่จอดรถ",
    "อินเตอร์เน็ตภายในอาคาร",
    "กล้องวงจรปิด",
    "ระบบรักษาความปลอดภัยแบบkeycard",
    "ระบบรักษาความปลอดภัยแบบแสกนลายนิ้วมือ",
    "สระว่ายน้ำ",
    "ร้านซักรีด",
    "เครื่องซักผ้า",
    "ตู้น้ำหยอดเหรียญ",
    "ร้านอาหาร",
    "ร้านสะดวกซื้อ",
    "ห้องอ่านหนังสือ",
    "ฟิตเนท",
    "ร้านเสริมสวย",
    "รถตู้รับส่ง",
  ];
  const [name, setName] = useState("");
  const [type, setType] = useState("หอพักแยกชาย-หญิง");
  const [address, setAddress] = useState("");
  const [deposit, setDeposit] = useState("");
  const [water, setWater] = useState("");
  const [elec, setElec] = useState("");
  const [common, setCommon] = useState("");
  const [facilities, setfacilities] = useState([]);
  const [des, setDes] = useState("");
  const [nameOwn, setNameown] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [lineid, setLineid] = useState("");
  const [image, setImage] = useState([]);
  const currentUser = Auth.getCurrentUser();
  const formData = new FormData();
  const history = useHistory();

  const saveinfordorm = () => {
    axios.post('/api/dorm/createDorm', {
      Dorm_Name: name,
      Type_D: type,
      Address: address,
      Deposit: deposit,
      Electric_Bill: elec,
      Water_Bill: water,
      Common_fee: common,
      Information: des,
      L_name: nameOwn,
      Contact_Number: phone,
      E_mail: email,
      Line_ID: lineid,
      user_id: currentUser.user_id
    },{ headers: authHeader() }).then((Response) => {
      const ID = Response.data.insertId;
      axios.post("/api/dorm/createFacilities",{Dorm_ID: ID, Facilities: facilities},{ headers: authHeader() }).then((Response) => {
        console.log(Response);
      });
      formData.append("Image", "");
      formData.append("Dorm_ID",ID);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      axios.post("/api/dorm/createImage", formData, config).then((Response) => {
        console.log(Response);
      });
      history.push("/owner");
    })

    // for (let i = 0; i < image.length; i++) {
    //   console.log("data: ",image[i]);
    //   formData.append("Image", image[i]);
    // }
    
    
    
  };
  return (
    <div className="containIn">
      <div className="Indorm">
        <h2>ชื่อหอพัก</h2>
        <input
          className="chong-one"
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <br />
        <h2>ประเภทหอพัก</h2>
        <select
          className="type-dorm"
          defaultValue="หอพักแยกชาย-หญิง"
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <option value="หอพักแยกชาย-หญิง">หอพักแยกชาย-หญิง</option>
          <option value="หอพักรวม">หอพักรวม</option>
        </select>
        <br />
        <h2>ที่อยู่หอพัก</h2>
        <textarea
          className="chong-address"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        ></textarea>
        <br />
        <h2>รายละเอียดค่าใช้จ่าย</h2>
        <ul>
          <h4 className="pay" id="p1">
            เงินมัดจำ/ประกัน
          </h4>
          <input
            className="chong-pay"
            onChange={(e) => {
              setDeposit(e.target.value);
            }}
          ></input>
          <h4 className="baht">บาท</h4>
          <br />
          <h4 className="pay" id="p2">
            อัตราค่าน้ำ
          </h4>
          <input
            className="chong-pay"
            onChange={(e) => {
              setWater(e.target.value);
            }}
          ></input>
          <h4 className="baht">บาท</h4>
          <br />
          <h4 className="pay" id="p3">
            อัตราค่าไฟ
          </h4>
          <input
            className="chong-pay"
            onChange={(e) => {
              setElec(e.target.value);
            }}
          ></input>
          <h4 className="baht">บาท</h4>
          <br />
          <h4 className="pay" id="p4">
            ค่าส่วนกลาง
          </h4>
          <input
            className="chong-pay"
            onChange={(e) => {
              setCommon(e.target.value);
            }}
          ></input>
          <h4 className="baht">บาท</h4>
        </ul>
        <br />
        <h2>สิ่งอำนวยความสะดวก</h2>
        <div className="facilities">
          <div className="facilities-inside">
            <h4 className="space">ภายในห้องพัก</h4>
            {facilitiesinsidedorm.map((data, key) => {
              return (
                <div key={key}>
                  <input
                    type="checkbox"
                    id={key}
                    value={data}
                    onChange={(e) => {
                      setfacilities([
                        ...facilities,
                        { Type_F: "ภายในห้องพัก", Facility: e.target.value },
                      ]);
                    }}
                  ></input>
                  <label htmlFor={key}>{data}</label>
                </div>
              );
            })}
          </div>
          <div className="facilites-center">
            <h4 className="space">ส่วนกลาง</h4>
            {facilitiescenter.map((data, key) => {
              return (
                <div key={key}>
                  <input
                    type="checkbox"
                    id={key}
                    value={data}
                    onChange={(e) => {
                      setfacilities([
                        ...facilities,
                        { Type_F: "ส่วนกลาง", Facility: e.target.value },
                      ]);
                    }}
                  ></input>
                  <label htmlFor={key}>{data}</label>
                </div>
              );
            })}
          </div>
        </div>
        <br />
        <h2>รายละเอียดหอพัก</h2>
        <textarea
          className="chong-detail "
          onChange={(e) => {
            setDes(e.target.value);
          }}
        ></textarea>
        <br />
        <h2>ข้อมูลติดต่อ</h2>
        <ul>
          <h4 className="space2">ชื่อผู้ดูแลหอพัก</h4>
          <input
            className="chong-three"
            onChange={(e) => {
              setNameown(e.target.value);
            }}
          ></input>
          <br />
          <h4 className="space2">เบอร์ติดต่อ</h4>
          <input
            className="chong-three"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          ></input>
          <br />
          <h4 className="space2">อีเมล</h4>
          <input
            className="chong-three"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <br />
          <h4 className="space2">LineID</h4>
          <input
            className="chong-three"
            onChange={(e) => {
              setLineid(e.target.value);
            }}
          ></input>
        </ul>
        <br />
        <h2>อัลบั้มภาพหอพัก</h2>
        <input
          type="file"
          className="file-input"
          multiple
          onChange={(e) => {
            let len = e.target.files.length;
            console.log("length file:", len);
            for (let i = 0; i < len; i++) {
              console.log("round ", i, " ", e.target.files[i]);
              formData.append("Image", e.target.files[i]);
            }
          }}
        ></input>
        <button className="save" onClick={saveinfordorm}>
          บันทึก
        </button>
      </div>
    </div>
  );
}
