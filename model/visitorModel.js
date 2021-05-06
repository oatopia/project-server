import db from '../util/database.js'
const Visitorget = () =>{
}

Visitorget.getallfactor = result =>{
    db.query("SELECT * FROM factor ",(err,res)=>{
        if(err){
            console.log("error:",err);
            result(null,err);
            return;
        }
        console.log(res);
        result(null,res);    
    });
};

export default Visitorget;

