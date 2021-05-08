import React, { useEffect, useState } from "react";
import "./Dorm_data.css";
import Navbar from "../component/NavbarOwner";
import Axios from "axios";
import backgroundimg from "../img/operatorbackground.jpg";
import Auth from "../service/authService.js";
import { Redirect, useHistory } from "react-router-dom";
import authHeader from "../service/auth-header.js";
import { useLocation } from "react-router";
import Dorminfo from "../component/Dorm/Dorm_info.js";

const Owner = () => {
  //  -------------------------------------------------------
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
  // ---------------------------------------------------------------------

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
    <div className="dormdata-container">
      <Navbar />
      <div className="box-dorm-data">
        {/* ---------------------------------------------------------------------- */}
        {showedit == false ? (
          <div className="box-info">
            <h1>{dorm.Dorm_Name}</h1>
            {img.map((pic, key) => {
              return (
                <img
                  key={key}
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
                  {fac.map((fa, index) => {
                    if (fa.Type_F == "ภายในห้องพัก")
                      return <li key={index}>{fa.Facility}</li>;
                  })}
                </ul>
              </div>

              <div className="fac-central">
                <h3>ส่วนกลาง</h3>
                <ul>
                  {fac.map((fa, index) => {
                    if (fa.Type_F == "ส่วนกลาง")
                      return <li key={index}>{fa.Facility}</li>;
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
        ) : (
          <div className="box-info">
            <form>
              <h2>ชื่อหอพัก</h2>
              <input
                className="chong-one"
                defaultValue={dorm.Dorm_Name}
                onChange={(e) => {
                  const name = { ...dorm };
                  name.Dorm_Name = e.target.value;
                  setDorm(name);
                  console.log("onchange dormname", dorm);
                }}
              ></input>
              <br />
              <h2>ประเภทหอพัก</h2>
              <select
                className="type-dorm"
                defaultValue={dorm.Type_D}
                onChange={(e) => {
                  const type = { ...dorm };
                  type.Type_D = e.target.value;
                  setDorm(type);
                }}
              >
                <option value="หอพักแยกชาย-หญิง">หอพักแยกชาย-หญิง</option>
                <option value="หอพักรวม">หอพักรวม</option>
              </select>
              <br />
              <h2>ที่อยู่หอพัก</h2>
              <textarea
                className="chong-address"
                defaultValue={dorm.Address}
                onChange={(e) => {
                  const add = { ...dorm };
                  add.Address = e.target.value;
                  setDorm(add);
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
                  defaultValue={dorm.Deposit}
                  onChange={(e) => {
                    const depo = { ...dorm };
                    depo.Deposit = e.target.value;
                    setDorm(depo);
                  }}
                ></input>
                <h4 className="baht">บาท</h4>
                <br />
                <h4 className="pay" id="p2">
                  อัตราค่าน้ำ
                </h4>
                <input
                  className="chong-pay"
                  defaultValue={dorm.Water_Bill}
                  onChange={(e) => {
                    const water = { ...dorm };
                    water.Water_Bill = e.target.value;
                    setDorm(water);
                  }}
                ></input>
                <h4 className="baht">บาท</h4>
                <br />
                <h4 className="pay" id="p3">
                  อัตราค่าไฟ
                </h4>
                <input
                  className="chong-pay"
                  defaultValue={dorm.Electric_Bill}
                  onChange={(e) => {
                    const eb = { ...dorm };
                    eb.Electric_Bill = e.target.value;
                    setDorm(eb);
                  }}
                ></input>
                <h4 className="baht">บาท</h4>
                <br />
                <h4 className="pay" id="p4">
                  ค่าส่วนกลาง
                </h4>
                <input
                  className="chong-pay"
                  defaultValue={dorm.Common_fee}
                  onChange={(e) => {
                    const cf = { ...dorm };
                    cf.Common_fee = e.target.value;
                    setDorm(cf);
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
                    let state = false;
                    let indexinner = 0;
                    fac.map((item, key) => {
                      if (data == item.Facility) {
                        state = true;
                        indexinner = key;
                      }
                    });
                    return (
                      <div key={key}>
                        <input
                          type="checkbox"
                          id={key}
                          value={data}
                          defaultChecked={state == true ? true : false}
                          onChange={(e) => {
                            let checkinner = false;
                            let indinner = 0;
                            fac.map((item, key) => {
                              if (data == item.Facility) {
                                checkinner = true;
                                indinner = key;
                              }
                            });
                            if (checkinner == true) {
                              let id = fac[indinner].F_ID;
                              Axios.delete(
                                `/api/dorm/facdeleteDelete/${id}`
                              ).then((Response) => {
                                setFac(
                                  fac.filter((item) => {
                                    return item.F_ID != id;
                                  })
                                );
                              });
                              checkinner = false;
                            } else {
                              const facil = {
                                Dorm_ID: dorm.user_id,
                                Type_F: "ภายในห้องพัก",
                                Facility: data,
                              };
                              Axios.post("/api/dorm/addfacil", facil, {
                                headers: authHeader(),
                              }).then((Response) => {
                                console.log("Response dorm: ", Response.data);
                                setFac([
                                  ...fac,
                                  {
                                    F_ID: Response.data.insertId,
                                    Dorm_ID: dorm.user_id,
                                    Type_F: "ภายในห้องพัก",
                                    Facility: data,
                                  },
                                ]);
                              });
                              checkinner = true;
                            }
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
                    let state = false;
                    fac.map((item, k) => {
                      if (data == item.Facility) {
                        state = true;
                      }
                    });
                    return (
                      <div key={key}>
                        <input
                          type="checkbox"
                          id={key}
                          value={data}
                          defaultChecked={state == true ? true : false}
                          onChange={(e) => {
                            console.log("before Delete2: ", fac);
                            let check = false;
                            let ind = 0;
                            fac.map((item, key) => {
                              if (data == item.Facility) {
                                console.log("fac ส่วนกลาง : ", item);
                                check = true;
                                ind = key;
                              }
                            });

                            if (check == true) {
                              let id = fac[ind].F_ID;
                              Axios.delete(
                                `/api/dorm/facdeleteDelete/${id}`
                              ).then((Response) => {
                                setFac(
                                  fac.filter((item) => {
                                    return item.F_ID != id;
                                  })
                                );
                                console.log("after Delete2: ", fac);
                              });
                              check = false;
                            } else {
                              const facil = {
                                Dorm_ID: dorm.user_id,
                                Type_F: "ส่วนกลาง",
                                Facility: data,
                              };
                              Axios.post("/api/dorm/addfacil", facil, {
                                headers: authHeader(),
                              }).then((Response) => {
                                console.log("Response ID: ", Response.data);
                                setFac([
                                  ...fac,
                                  {
                                    F_ID: Response.data.insertId,
                                    Dorm_ID: dorm.user_id,
                                    Type_F: "ส่วนกลาง",
                                    Facility: data,
                                  },
                                ]);
                                console.log("after add fac: ", fac);
                              });
                              check = true;
                            }
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
                defaultValue={dorm.Information}
                onChange={(e) => {
                  const info = { ...dorm };
                  info.Information = e.target.value;
                  setDorm(info);
                }}
              ></textarea>
              <br />
              <h2>ข้อมูลติดต่อ</h2>
              <ul>
                <h4 className="space2">ชื่อผู้ดูแลหอพัก</h4>
                <input
                  className="chong-three"
                  defaultValue={dorm.L_name}
                  onChange={(e) => {
                    const lname = { ...dorm };
                    lname.L_name = e.target.value;
                    setDorm(lname);
                  }}
                ></input>
                <br />
                <h4 className="space2">เบอร์ติดต่อ</h4>
                <input
                  className="chong-three"
                  defaultValue={dorm.Contact_Number}
                  onChange={(e) => {
                    const cn = { ...dorm };
                    cn.Contact_Number = e.target.value;
                    setDorm(cn);
                  }}
                ></input>
                <br />
                <h4 className="space2">อีเมล</h4>
                <input
                  className="chong-three"
                  defaultValue={dorm.E_mail}
                  onChange={(e) => {
                    const email = { ...dorm };
                    email.E_mail = e.target.value;
                    setDorm(email);
                  }}
                ></input>
                <br />
                <h4 className="space2">LineID</h4>
                <input
                  className="chong-three"
                  defaultValue={dorm.Line_ID}
                  onChange={(e) => {
                    const line = { ...dorm };
                    line.Line_ID = e.target.value;
                    setDorm(line);
                  }}
                ></input>
              </ul>
              <br />
              <h2>อัลบั้มภาพหอพัก</h2>
              <input type="file" className="file-input" multiple></input>
            </form>
          </div>
        )}
        {/* ---------------------------------------------------------------------- */}

        {showedit == false ? (
          <></>
        ) : (
          <button
            className="save-edit-dorm"
            onClick={() => {
              // Axios.put(`/api/dorm/dormUpdate/${id}`, {
              //   user_id: id,
              //   username: editun,
              //   type: editT,
              // })
              //   .then((Response) => {
              //     setEditAC("");
              //     setUser(
              //       user.map((item) => {
              //         return item.user_id == id
              //           ? { user_id: id, username: editun, type: editT }
              //           : item;
              //       })
              //     );
              //   })
              //   .catch((error) => {
              //     console.log(error);
              //   });
              setShowedit(false);
            }}
          >
            {" "}
            บันทึก{" "}
          </button>
        )}
        <button
          className="but-edit-dorm"
          onClick={() => {
            setShowedit(true);
          }}
        >
          แก้ไขข้อมูลหอพัก
        </button>
      </div>
    </div>
  );
};

export default Owner;
