import { React, useEffect, useState } from "react";
import "./Admin.css";
import Axios from "axios";
import NavbarAdmin from "../component/NavbarAdmin.js";
import deleteicon from "../img/deleteicon.png";
import editicon from "../img/edit.png";

function Admin() {
  const [user, setUser] = useState([]);
  const [editAC, setEditAC] = useState("");
  const [editun, setEditUN] = useState("");
  const [editT, setEditT] = useState("");

  const deleteAccount = (id) => {
    console.log("ID:", id);
    Axios.delete(`/api/Admin/userDelete/${id}`).then((Response) => {
      setUser(
        user.filter((val) => {
          return val.user_id != id;
        })
      );
    });
  };

  const updateAccount = (id) => {
    console.log("ID:", id);
    Axios.put(`/api/Admin/userUpdate/${id}`,{user_id: id, username: editun, type: editT}).then((Response) => {
      setEditAC("");
      setUser(user.map((item)=>{
        return item.user_id == id ? {user_id:id,username:editun,type:editT} 
        : item ;
      }))
      
    }).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    Axios.get("/api/Admin/user", {})
      .then((Response) => {
        setUser(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="contnet-user-Admin">
      <NavbarAdmin></NavbarAdmin>
      <h1 className="h1-user-Admin">บัญชีผู้ใช้งาน</h1>
      <div className="content2-user-admin">
        {user.map((data) => {
          return (
            <div className="user-box-Admin">
              <div className="edit-box">
                <label className="user-info">{data.user_id}</label>
                {editAC == data.user_id ? (
                  <input
                    type="text"
                    className="user-info"
                    id="edit-input-user"
                    onChange={(e) => {
                      setEditUN(e.target.value);
                    }}
                  ></input>
                ) : (
                  <label className="user-info">{data.username}</label>
                )}

                {editAC == data.user_id ? (
                  <div className="edit-box-input">
                    <input
                      type="text"
                      className="user-info"
                      id="edit-input-user"
                      onChange={(e) => {
                        setEditT(e.target.value);
                      }}
                    ></input>
                    <button
                      className="save-edit-but-user"
                      onClick={() => {
                        updateAccount(data.user_id);
                      }}
                    >
                      บันทึก
                    </button>
                  </div>
                ) : (
                  <label className="user-info">{data.type}</label>
                )}
              </div>
              <div className="use-icon-box">
                <img
                  src={editicon}
                  onClick={() => {
                    setEditAC(data.user_id);
                  }}
                  className="icon-user"
                ></img>
                <img
                  src={deleteicon}
                  onClick={() => {
                    deleteAccount(data.user_id);
                  }}
                  className="icon-user"
                ></img>
              </div>
            </div>
          );
        })}
      </div>
      <div className="clear-user-Admin"></div>
    </div>
  );
}

export default Admin;
