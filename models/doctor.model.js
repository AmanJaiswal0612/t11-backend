const {Schema,model}= require("mongoose")



const DoctorSchema= new Schema({
    name:String,
    email:String,
    hash:String
})

const Doctor= model("doctor",DoctorSchema);

module.exports= Doctor