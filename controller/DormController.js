import dormModel from "../model/DormModel.js";

export const createDorm = (req, res) => {
  const Dorm = new dormModel({
    Dorm_Name: req.body.Dorm_Name,
    Type_D: req.body.Type_D,
    Address: req.body.Address,
    Deposit: req.body.Deposit,
    Electric_Bill: req.body.Electric_Bill,
    Water_Bill: req.body.Water_Bill,
    Common_fee: req.body.Common_fee,
    Information: req.body.Information,
    L_name: req.body.L_name,
    Contact_Number: req.body.Contact_Number,
    E_mail: req.body.E_mail,
    Line_ID: req.body.Line_ID,
    user_id: req.body.user_id,
  });
  dormModel.createDorminfo(Dorm, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.send(data);
    }
  });
};

export const createFacilities = (req, res) => {
  const id = req.body.Dorm_ID;
  const jsondata = req.body.Facilities;
  const object = {
    Dorm_ID: id,
    Facilities: jsondata,
  };
  dormModel.createFac(object, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

export const createImage = (req, res) => {
  const id = req.body.Dorm_ID;
  var imagename = [];
  const file = req.files.Image;
  if (file.length === undefined) {
      imagename.push(file.name);
    if (
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/png" ||
        file.mimetype == "image/gif"
      ) {
        file.mv("public/img_Dorm/" + file.name, (err) => {
          if (err) return console.log(err);
        });
      }
  } else {
    console.log("file: ", file);
    console.log("file length", req.files.Image.length);

    for (let i = 0; i < file.length; i++) {
      imagename.push(file[i].name);
      console.log("file name: ", file[i].name);
      if (
        file[i].mimetype == "image/jpeg" ||
        file[i].mimetype == "image/png" ||
        file[i].mimetype == "image/gif"
      ) {
        file[i].mv("public/img_Dorm/" + file[i].name, (err) => {
          if (err) return console.log(err);
        });
      }
    }
  }
  const object = {
    Dorm_ID: id,
    Image_name: imagename,
  };
  console.log("object: ", object);
  dormModel.createImg(object, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

export const getDorm = (req, res) => {
  const id = req.body.user_id;
  dormModel.getdormbyID(id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

export const getDormDataByID = (req, res) => {
    const id = req.body.Dorm_ID;
    console.log("Dorm id: ",id);
    dormModel.getdormdatabyID(id, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    });
  };

export const getFacilities = (req, res) => {
    const id = req.body.Dorm_ID;
    console.log("Dorm id: ",id);
    dormModel.getfacilitiesbyID(id, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    });
  };

  export const getImage = (req, res) => {
    const id = req.body.Dorm_ID;
    console.log("Dorm id: ",id);
    dormModel.getimagebyID(id, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    });
  };

  export const deletefacbyID = (req, res) => {
    const fid = req.params.id;
    console.log("fac id: ",fid);
    dormModel.deleteFacbyId(fid, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    });
  };

  export const addfac = (req, res) => {
    const id = req.body.Dorm_ID;
    const typef = req.body.Type_F;
    const fac = req.body.Facility;
    const object = {
      Dorm_ID:id,
      Type_F:typef,
      Facility:fac
    };
    console.log(object)
    dormModel.addFac(object, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("data from add fac: ",data)
        res.send(data);
      }
    });
  };