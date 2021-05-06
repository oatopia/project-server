import visitormodel from "../model/visitorModel.js";
import {calmatrix,calMatLength,magDorm}from '../util/calmatch.js';
import fs from 'fs'

export const getfactor = (req, res) => {
    visitormodel.getallfactor((err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    });
  };