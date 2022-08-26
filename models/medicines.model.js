const {Schema,model}= require("mongoose")


const MedicineSchema= new Schema({
    name:String,
    qty:Number
})

const Medicine= model("medicine",MedicineSchema);

module.exports= Medicine