import db from '../util/database.js'

const Dorminfo = function(e) {
    this.Dorm_Name = e.Dorm_Name;
    this.Type_D = e.Type_D;
    this.Address = e.Address;
    this.Deposit = e.Deposit;
    this.Electric_Bill = e.Electric_Bill;
    this.Water_Bill = e.Water_Bill;
    this.Common_fee = e.Common_fee;
    this.Information = e.Information;
    this.L_name = e.L_name;
    this.Contact_Number = e.Contact_Number;
    this.E_mail = e.E_mail;
    this.Line_ID = e.Line_ID;
    this.user_id = e.user_id;
}

Dorminfo.createDorminfo = (newDorm,result) =>{
    // console.log("in modle: ",newDorm.Dorm_Name)
    // console.log("in model image: ",newDorm.Image)
    // console.log("in model facilities: ",newDorm.Facilities)
    // newDorm.Facilities.map(i =>{console.log("facili: ",i.Facility)});
    // db.query("INSERT INTO dormitory (Dorm_Name,Type_D,Address,Deposit,Electric_Bill,Water_Bill,Common_fee,Information,L_name,Contact_Number,E_mail,Line_ID) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"
    // ,[newDorm.Dorm_Name,newDorm.Type_D,newDorm.Address,newDorm.Deposit,newDorm.Electric_Bill,newDorm.Water_Bill,
    // newDorm.Common_fee,newDorm.Information,newDorm.L_name,newDorm.Contact_Number,newDorm.E_mail,newDorm.Line_ID],(err,res)=>{
        // db.query("INSERT INTO facilities SET ?",newDorm,(err,res)=>{
        db.query("INSERT INTO dormitory SET ?",newDorm,(err,res)=>{
        if(err){
            console.log("error: ",err);
        result(err,null);
        return;
        }
        console.log(res);
        result(null,res);
        // db.query("INSERT INTO facilities (Dorm_ID,Type_F,Facility) VALUES ?",[newDorm.Facilities.map(items=>[ID,items.Type_F,items.Facility])],(err,res)=>{
        //     if(err){
        //         console.log("error: ",err);
        //     result(err,null);
        //     return;
        //     }
        //     console.log(res);
        // })
        // db.query("INSERT INTO image_Dorm (Dorm_ID,image) VALUES ?",[newDorm.image.map(item=>[ID,item])],(err,res)=>{
        //     if(err){
        //         console.log("error: ",err);
        //     result(err,null);
        //     return;
        //     }
        //     console.log(res);
        // })
        
    });
};

Dorminfo.createFac = (newfac,result)=>{
    const fac = newfac.Facilities;
    db.query("INSERT INTO facilities (Dorm_ID,Type_F,Facility) VALUES ?",[fac.map(item=>[newfac.Dorm_ID,item.Type_D,item.Facility])],(err,res)=>{
        if(err){
            console.log("error: ",err);
        result(err,null);
        return;
        }
        console.log(res);
    })
}

Dorminfo.createImg = (newImg,result)=>{
    const img_name = newImg.Image_name
    db.query("INSERT INTO image_Dorm (Dorm_ID,image) VALUES ?",[img_name.map(item=>[newImg.Dorm_ID,item])],(err,res)=>{
        if(err){
            console.log("error: ",err);
        result(err,null);
        return;
        }
        console.log(res);
    })
}

Dorminfo.getdormbyID = (id,result)=>{
    db.query("SELECT * FROM dormitory WHERE user_id = ?",id,(err,res)=>{
        if(err){
            console.log("error: ",err);
        result(err,null);
        return;
        }
        console.log(res);
        result(null,res)
    })
}

Dorminfo.getdormdatabyID = (id,result)=>{
    db.query("SELECT * FROM dormitory WHERE Dorm_ID = ?",id,(err,res)=>{
        if(err){
            console.log("error: ",err);
        result(err,null);
        return;
        }
        console.log(res);
        result(null,res)
    })
}

Dorminfo.getfacilitiesbyID = (id,result)=>{
    db.query("SELECT * FROM facilities WHERE Dorm_ID = ?",id,(err,res)=>{
        if(err){
            console.log("error: ",err);
        result(err,null);
        return;
        }
        console.log(res);
        result(null,res)
    })
}

Dorminfo.getimagebyID = (id,result)=>{
    db.query("SELECT * FROM image_dorm WHERE Dorm_ID = ?",id,(err,res)=>{
        if(err){
            console.log("error: ",err);
        result(err,null);
        return;
        }
        console.log(res);
        result(null,res)
    })
}

Dorminfo.deleteFacbyId = (fid,result) =>{
    db.query("DELETE FROM facilities WHERE F_ID = ?",fid,(err,res)=>{
        if(err){
            console.log("error:",err);
            result(null,err);
            // return;
        }
        console.log("delete fac: ",res)
        result(null,res);    
    });
};

Dorminfo.addFac = (fac,result)=>{
    db.query("INSERT INTO facilities SET ?",fac,(err,res)=>{
        if(err){
            console.log("error: ",err);
        result(err,null);
        return;
        }
        console.log("res insertID: ",res.insertId);
        result(null,res);
    })
}

export default Dorminfo;