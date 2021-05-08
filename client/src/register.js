import './register.css';
import img from './img/registerimg.png'
import Navbar from './component/Navbar'
import Axios from 'axios'
import React,{useState} from 'react';
import Auth from './service/authService.js'
import {useHistory} from 'react-router-dom';
// import History from './utils/authUtils/History.js'



function Register() {
    const history = useHistory();
    const [username,setusername] = useState("");
    const [password,setpassword] = useState("");
    const [type,settype] = useState("สมาชิก");

    const addinfo = (e) =>{
        e.preventDefault();
        Axios.post('api/user/register',{
            username: username,
            password: password,
            type: type
        }).then(()=>{
            console.log("sucess");
        })
    }


    const handleRegister=(e)=> {
        e.preventDefault();
        Auth.register(username,password,type)
        .then(Response=>{
            history.push("/login");
            console.log(Response.data);

        })
    }
    return(
        <>
            <Navbar></Navbar>
             <div className="container">
                 <div className="container1">
                 <form className = "form1" onSubmit={handleRegister}>
                     <ul className="containerlist">
                         <h1 id="head-register">สมัครสมาชิก</h1>
                         <p>ชื่อผู้ใช้</p>
                         <input className="input-text-register" onChange={(e)=>{
                             setusername(e.target.value);
                         }} ></input>
                         <br></br>
                         <p>รหัสผ่าน</p>
                         <input className="input-text-register" onChange={(e)=>{
                             setpassword(e.target.value);
                         }}></input>
                         <br></br>
                         <p>ประเภทผู้ใช้งาน</p>
                         <select className="type" onChange={(e)=>{
                             settype(e.target.value);
                         }} defaultValue="สมาชิก">
                             <option value="สมาชิก">สมาชิก</option>
                             <option value="ผู้ประกอบการ">ผู้ประกอบการ</option>
                         </select>
                         <br/><br/>
                         <button className="buttonregister" type="submit">สมัครสมาชิก</button>
                         <br/><br/>
                         
                     </ul>
                 </form> 
                 <img src={img} className="img" width="400" height="500"></img>
                 </div>
                        
             </div>
            </>
    );    
}






export default Register;