const {Schema,model}= require("mongoose")


const ObjectId= Schema.Types.ObjectId;
const PatientSchema= new Schema({
    name:String,
    gender:String,
    age:Number,
    doctorId:ObjectId,
    medIds:[ObjectId]
})

const Patient= model("patient",PatientSchema);

module.exports= Patient