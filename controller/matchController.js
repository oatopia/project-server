import matchmodel from "../model/matchModel.js";
import {calmatrix,calMatLength,magDorm}from '../util/calmatch.js';
import fs from 'fs'

export const getall = (req, res) => {
  matchmodel.getallfactor((err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

export const createweight = (req, res) => {
  let payload = req.body;
  console.log(payload);
  matchmodel.createWeight(payload, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

export const matchDorm = (req, res) => {
  let jsondata = req.body;
  console.log(jsondata);
  // let matrix = [];
  let Matrixlength = calMatLength(jsondata.length);
  console.log(Matrixlength);

  let Matrixcal = calmatrix(jsondata);
  console.log("data",Matrixcal);


  let DormData = [];
  try{
    DormData = JSON.parse(fs.readFileSync("Score_Dorm.txt",'utf-8'));
  }catch(err){
    console.log(err);
  }
  
  console.log("Dorm data:"+DormData);
  let ArrayDorm = magDorm(DormData,Matrixlength);
  console.log("Array Dorm",ArrayDorm);
  const ArrayDormlength = ArrayDorm.length;

  let suiValue = 0;
  for (let i = 0; i < ArrayDorm.length; i++) {
    for (let j = 0; j < Matrixcal.length; j++) {
      if((j+1) == ArrayDorm[i].Score_ID[j].Feature_ID){
        suiValue = suiValue + (ArrayDorm[i].Score_ID[j].Score * Matrixcal[j])
      }
    }
    ArrayDorm[i].Sui_Value = suiValue;
    suiValue = 0;
  }

  console.log("Suitable Value: ",ArrayDorm);


  ArrayDorm.sort((a,b)=>b.Sui_Value-a.Sui_Value);
  console.log("Array sort:",ArrayDorm);

  let MatchArray = [];
  // let index = 0;
  
  for (let i = 0; i < ArrayDorm.length; i++) {
    MatchArray.push(ArrayDorm[i].Dorm_ID);
  }
  console.log(MatchArray);

  matchmodel.getAllDorm((err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      let DormArray = [];
      for (let i = 0; i < MatchArray.length; i++) {
        for (let j = 0; j < data.length; j++) {
          if(MatchArray[i] == data[j].Dorm_ID){
            DormArray.push(data[j]);
          }
        }
      }
      console.log(DormArray);                                    
      res.send(DormArray);
    }
  });
};

export const searchDorm = (req, res) => {
  const Dorm_name = req.body.Search;
  console.log("dorm name: ",Dorm_name);
  matchmodel.searchbyName(Dorm_name,(err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data[0]);
      res.send(data[0]);
    }
  });
};

export const getWeight = (req, res) => {
  const user_id = req.body.user_id
  matchmodel.getweightbyID(user_id,(err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("data from get weight: ",data)
      res.send(data);
    }
  });
};



export const updateWeight = (req, res) => {
  let payload = req.body;
  console.log(payload);
  matchmodel.updateweightbyID(payload, (err, data) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
};

export const createBook = (req, res) => {
  let  payload = req.body;
  console.log(payload);
  matchmodel.createbookbyID(payload, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("data from create bookmark",data);
      res.send(data);
    }
  });
};

export const getBookmark = (req, res) => {
  const id = req.body.user_id
  matchmodel.getbookmarkbyID(id,(err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("data from get bookmark: ",data)
      res.send(data);
    }
  });
};

export const deleteBook= (req, res) => {
  const id = req.params.id
  console.log("id to delete bookmark:",id)
  matchmodel.deletebookmarkbyID(id,(err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("data from delete bookmark: ",data)
      res.send(data);
    }
  });
};