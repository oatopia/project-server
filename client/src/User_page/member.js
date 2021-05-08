import {React,useEffect,useState} from 'react';
import {Redirect } from 'react-router-dom'
import './member.css';
import NavbarMember from '../component/NavbarMember.js';
import Match_member from '../component/Match-member';
import Axios from 'axios' 
import Auth from '../service/authService.js'
import authHeader from '../service/auth-header.js';

function Member() {
  const [search,setSearch] = useState("");
  const currentUser = Auth.getCurrentUser();

  const searchFac = (e) => {
    e.preventDefault();
    console.log(search)
    Axios.post('/api/match/searchDorm',{
      Search:search
    },{headers: authHeader()})
    .then(Response => {
        console.log("Respone serach: ",Response.data);
    }).catch(error=>{
        console.log(error);
    })
  }

  if(!currentUser){
    return <Redirect to="/login"/>
  }else{
    if(!currentUser=='สมาชิก'){
      return <Redirect to="/login"/>
    }
  }
    return (
    <div className="appcontainer-member">
      <NavbarMember></NavbarMember>
      <div className="searchbar-member">
        <input className="searchinput-member" onChange={(e)=>{
          setSearch(e.target.value);
        }}></input> 
        <button className="searchbutton-member" onClick={searchFac}>ค้นหา</button>
      </div>
      <Match_member/>
    </div>
    );
}

export default Member;