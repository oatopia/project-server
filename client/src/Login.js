import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import './Login.css';
import img from './img/loginimg.jpg'
import Navbar from './component/Navbar'
import Axios from 'axios'
import Auth from './service/authService.js'


const Login = ()=> {
    
    var history = useHistory();
    const [username,setusername] = useState("");
    const [password,setpassword] = useState("");
    // const login = (e) =>{
    //     e.preventDefault();
    //     Axios.post('/api/user/login',{
    //         username: username,
    //         password: password
    //     }).then( Response =>{
    //         if(Response.data.type == "สมาชิก"){
    //             history.push("/member/id:"+Response.data.user_id);
    //         }else{
    //             history.push("/owner/id:"+Response.data.user_id);
    //         }
    //     })
    // }
    // if(type == " สมาชิก"){
    //     return window.location.href="/member",settype("");
    // }else{
    //     return window.location.href="/owner",settype("");
    // }
    const handleLogin=(e)=> {
        e.preventDefault();
        Auth.login(username,password)
        .then(Response=>{
            console.log(Response);
            if(Response.type == "สมาชิก"){
                history.push("/member");
                // window.location.reload();
            }else if(Response.type == "ผู้ประกอบการ"){
                history.push("/owner");
                // window.location.reload();
            }
        })
    }
    const currentUser = Auth.getCurrentUser();
    console.log("login page: ",currentUser);
  return (
   <>
    <Navbar></Navbar>
    <div className="containerlog">
        
        <div className="container1">
            <form className="form2" onSubmit={handleLogin}>
                <ul className="containerlist">
                    <h1 id="head-login">เข้าสู่ระบบ</h1>
                    <p>ชื่อผู้ใช้</p>
                    <input className="text-input" onChange={(e)=>{
                             setusername(e.target.value);
                         }}></input>
                    <br></br>
                    <p>รหัสผ่าน</p>
                    <input className="text-input" onChange={(e)=>{
                             setpassword(e.target.value);
                         }}></input>
                    <br></br>
                    <button className="buttonregister"  type="submit">เข้าสู่ระบบ</button>
                </ul>
            </form>
        <img src={img} className="img" width="400" height="470"></img>
        </div>        
    </div>
   </>
  );
}

export default Login;