import db from '../util/database.js'
import bcrypt from "bcrypt-nodejs";

const Userinfo = function(e) {
    this.username = e.username;
    this.password = e.password;
    this.type = e.type;
}

Userinfo.create = (newUser,result) =>{
    db.query("INSERT INTO userinformation SET ?",newUser,(err,res)=>{
        if(err){
            console.log("error: ",err);
        result(err,null);
        return;
        }
        result(null,res);
    });
};

Userinfo.login = (username,result) =>{
    db.query("SELECT * FROM userinformation WHERE username = ? ", username,(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        console.log(res);
        result(null,res);
    });
};

Userinfo.validPassword =  (loginpassword,datapassword)=> {
    return bcrypt.compareSync(loginpassword, datapassword);
}

Userinfo.validateUser = (username) =>{
    db.query("SELECT username FROM userinformation WHERE username = ? ", username,(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        console.log(res);
        result(null,res);
    });
}

export default Userinfo;