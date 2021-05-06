import con from '../config/config.js';
import db from '../util/database.js'

const Matching = function(e){
    this.id = e.id;
    this.factorname = e.id;
    this.weight = e.weight;
}


Matching.getallfactor = result =>{
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


Matching.createWeight = (newWeight,result) =>{
    db.query("INSERT INTO weight (comparator, weight, user_id, index_compare) VALUES ?",[newWeight.data.map(item=>[item.comparator,item.weight,newWeight.user_id,item.index_compare])],(err,res)=>{
        if(err){
            console.log("error: ",err);
        result(err,null);
        return;
        }
        
        result(null,res);
    });
}


Matching.getallDormScore = result =>{
    db.query("SELECT * FROM Scoring_Factors ",(err,res)=>{
        if(err){
            console.log("error:",err);
            result(null,err);
            return;
        }
        result(null,res);    
    });
};


Matching.getDormbyID = (Array_ID,result) =>{
    console.log("in MatchModel:",Array_ID);
    db.query("SELECT * FROM dormitory WHERE Dorm_ID IN ("+db.escape(Array_ID)+")",(err,res)=>{
        if(err){
            console.log("error:",err);
            result(err,null);
            return;
        }
        console.log(res);
        result(null,res);    
    });
};

Matching.getAllDorm = (result) =>{
    db.query("SELECT * FROM dormitory ",(err,res)=>{
        if(err){
            console.log("error:",err);
            result(err,null);
            return;
        }
        console.log(res);
        result(null,res);    
    });
};


Matching.searchbyName = (name,result) =>{
    db.query("SELECT * FROM dormitory WHERE Dorm_Name = ?",name,(err,res)=>{
        if(err){
            console.log("error:",err);
            result(null,err);
            return;
        }
        result(null,res);    
    });
};


Matching.getweightbyID = (user_id,result) =>{
    db.query("SELECT * FROM weight WHERE user_id = ? ",user_id,(err,res)=>{
        if(err){
            console.log("error:",err);
            result(null,err);
            return;
        }
        result(null,res);    
    });
};

Matching.updateweightbyID = (data,result) =>{
    console.log(data);
    let lengthDATA = data.data.length
    for (let i = 0; i < lengthDATA; i++) {
        db.query("UPDATE weight SET comparator = ?, weight = ? WHERE user_id = ? AND index_compare = ? ",[data.data[i].comparator,data.data[i].weight,data.user_id,data.data[i].index_compare],(err,res)=>{
            if(err){
                console.log("error:",err);
                result(null,err);
            }
            console.log("update complete at index_compare: ",data.data[i].index_compare)
        });
        
    }
    
};


Matching.getbookmarkbyID = (id,result) =>{
    db.query("SELECT * FROM bookmark WHERE user_id = ? ",id,(err,res)=>{
        if(err){
            console.log("error:",err);
            result(null,err);
            return;
        }
        result(null,res);    
    });
};

Matching.createbookbyID = (newbook,result) =>{
    db.query("INSERT INTO bookmark SET user_id = ?, Dorm_ID = ?",[newbook.user_id,newbook.Dorm_ID],(err,res)=>{
        if(err){
            console.log("error: ",err);
        result(err,null);
        return;
        }
        
        result(null,res);
    });
}

Matching.deletebookmarkbyID = (id,result) =>{
    db.query("DELETE FROM bookmark WHERE M_ID = ?",id,(err,res)=>{
        if(err){
            console.log("error:",err);
            result(null,err);
            // return;
        }
        console.log("delete bookmark: ",res)
        result(null,res);    
    });
};

export default Matching;