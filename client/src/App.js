import React from "react";
import "./App.css";
import {
  BrowserRouter,
  Route,
  Link,
  Router,
  Redirect,
  Switch,
} from "react-router-dom";
import visitor from "./Visitor.js";
import register from "./register.js";
import login from "./Login.js";
import member from "./User_page/member.js";
import owner from "./Dorm_page/owner.js";
import resultmatch from "./User_page/resultmatch.js";
import visitorResult from "./visitorResult.js";
import admin from "./Admin_page/Admin.js";
import adminfactor from "./Admin_page/Adminfactor.js";
import addDorm from "./Dorm_page/addDorm.js";
import dormdata from "./Dorm_page/Dorm_data.js";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={visitor} />
        <Route exact path="/register" component={register} />
        <Route exact path="/login" component={login} />
        <Route path="/member" component={member} />
        <Route path="/owner" component={owner} />
        <Route path="/resultmatch" component={resultmatch} />
        <Route path="/visitorResult" component={visitorResult} />
        <Route path="/Admin" component={admin} />
        <Route path="/Adminfactor" component={adminfactor} />
        <Route path="/addDorm" component={addDorm} />
        <Route path="/dormdata" component={dormdata} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
