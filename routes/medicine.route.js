const Router= require("express");
const Medicine = require("../models/medicines.model");
const Patient = require("../models/patient.model");


const medicineRoute= Router();




medicineRoute.post("/",async(req,res)=>{
    const {name,qty}= req.body;
    try{
        await Medicine.insertMany(req.body);
        res.status(201).send("Medicine added")
    }catch(e){
        res.status(501).send("Internal Error Medicine")
    } 
})

medicineRoute.get("/:id", async(req,res)=>{
    try{
        const patient= await Patient.find({_id:req.params.id});
        const meds= patient[0].medIds;
        console.log(meds.length)
        let result=[]; 
        for(let i=0;i<meds.length;i++){
            let id=meds[i];
            let temp = await Medicine.findOne(id)
            result.push(temp);
        }
        res.status(201).json(result);
    }catch(e){
       res.status(501).send("Internal error meds get")
    }
})



module.exports= medicineRoute;