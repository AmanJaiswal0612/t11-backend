const Router= require("express");
const Medicine = require("../models/medicines.model");
const Patient = require("../models/patient.model");


const patientRoute= Router();


//create medicine

patientRoute.get("/",async (req,res)=>{
    const doctorId= req.headers.doctor;
    if(!doctorId) res.status(500).send("Internal error")
    let {page,limit,gender,age}= req.query;
    if(age){
        if(age=='asc'){
            age=1
         }else if(age=="dec"){
             age=-1
         }else{
            age=1
         }
    }
  
    if(!page)page=1;
    if(!limit) limit=5;
    page=parseInt(page)
    limit=parseInt(limit)
    let skips=limit* (page-1);

    

    
    try{
     if(age,gender){
        let p=await Patient.find({doctorId,gender}).skip(skips).limit(limit).sort({age});
        return res.status(200).send(p);
     }
     if(age){
        let p=await Patient.find({doctorId}).skip(skips).limit(limit).sort({age});
        return res.status(200).send(p);
     }else if(gender){
        let p=await Patient.find({doctorId,gender}).skip(skips)
        return res.status(200).send(p);
     }
     let p=await Patient.find({doctorId}).skip(skips).limit(limit);
     res.status(200).send(p);
    }catch(e){
       res.status(500).send("internal error")
    }
})


patientRoute.get("/name", async (req,res)=>{
    const doctorId= req.headers.doctor;
    if(!doctorId) res.status(500).send("Internal error")
    try{
        let p = await Patient.find({
          name: { $regex: req.query.search, $options: /i/ },
        });
        res.status(201).json(p);
    }catch(e){
        res.status(500).send("internal error")
    }
})

patientRoute.post("/",async (req,res)=>{
   const {name,gender,age,meds,doctorId}= req.body;
   let medIds=[];
   for(let i=0;i<meds.length;i++){
     let med=await Medicine.find({name:meds[i]});
     medIds.push(med[0]._id)
   }
   try{
    await Patient.insertMany({name,gender,age,medIds,doctorId});
    res.status(201).send("patient added")
   }catch(e){
    res.status(501).send("Internal Error patient")
   }
})


module.exports= patientRoute;