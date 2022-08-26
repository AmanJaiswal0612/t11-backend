const crypto= require("crypto");
const {Router}= require("express");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctor.model");

const signRoute= Router();
signRoute.post("/signup", async (req, res) => {
    const{name,email,password}= req.body;
    //generate hash from password and store that in db so one knows his pass word
    //first parameter is password , 2nd secret key,3rd no of iteration,4th no of charcters, 5th algorithum
    const hash= crypto.pbkdf2Sync(password,"SECRET1234",60,64,"sha256").toString("hex");
    await Doctor.insertMany({name,email,hash});
    res.status(201).send("user cretaed");
  });


  signRoute.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await Doctor.find({ email});
    //generate hash again with that password if the hash prsent in db and hash newly formed is samee  then user is valid 
    const hash= crypto.pbkdf2Sync(password,"SECRET1234",60,64,"sha256").toString("hex");
    if(hash!==user[0].hash){
     return res.status(401).send("Invalid User");
    }
    
      const token = jwt.sign({ name: user[0].name }, "SECRET1234");
      res.status(201).send({ token ,userId:user[0]._id});
  });

  module.exports=signRoute;