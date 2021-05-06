import adminModel from "../model/adminModel.js";

export const getUser = (req, res) => {
  adminModel.getallUser((err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

export const getFactor = (req, res) => {
  adminModel.getallfactor((err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

export const deleteUser = (req, res) => {
  let uID = req.params.id;
  console.log(uID);
  adminModel.deleteUserbyId(uID, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

export const createFactor = (req, res) => {
  const newFactor = req.body.new_factor;
  const file = req.files.ImageFactor;
  const image_name = file.name;
  const array = {
    Factor_name: newFactor,
    Image_factor: image_name,
  };
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/gif"
  ) {
    file.mv("public/images/" + image_name, (err) => {
      if (err) return console.log(err);
      adminModel.insertFactor(array, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(array);
          const objectdata = {
            Id: data.insertId,
            Factor_name: newFactor,
            Image_factor: image_name,
          };
          res.send(objectdata);
        }
      });
    });
  }
};

export const deleteFactor = (req,res)=>{
  let fID = req.params.id;
  console.log(fID)
  adminModel.deleteFactorbyId(fID,(err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    });
};

export const updateUser = (req,res)=>{
  const obj = {
    user_id : req.body.user_id,
    username: req.body.username,
    type: req.body.type,
  };
  adminModel.updateUserbyId(obj, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log("update user: ",data)
          res.send(obj);
        }
      });
    };

export const updateFactor = (req,res)=>{
  let fID = req.params.id;
  const newFactor = req.body.EditName;
  const file = req.files.EditImage;
  const image_name = file.name;
  const obj = {
    Id : fID,
    Factor_name: newFactor,
    Image_factor: image_name,
  };
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/gif"
  ) {
    file.mv("public/images/" + image_name, (err) => {
      if (err) return console.log(err);
      adminModel.updateFactorbyId(obj, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          // const objectdata = {
          //   Id: data.insertId,
          //   Factor_name: newFactor,
          //   Image_factor: image_name,
          // };
          console.log("update data: ",data)
          res.send(obj);
        }
      });
    });
  }
};