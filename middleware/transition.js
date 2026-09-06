const express = require("express");
const router = express.Router();
const pool = require("../db");
const transition = async (req, res) => {
  const { projectId, nextStatus,comment}=req.body;
  if(!projectId || !nextStatus){
      return res.status(400).json({success:false,error:{code:"BAD_REQUEST",message:"Please provide all the required fields"}});
  }

  res.status(200).json({success:true,data:{message:"Transition successful, status:need development contact backend developer"}});
}
module.exports = transition;