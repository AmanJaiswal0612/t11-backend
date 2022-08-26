const express= require("express");
const connection = require("./db");
const cors = require("cors");
const signRoute = require("./routes/sign.route");
const medicineRoute = require("./routes/medicine.route");
const patientRoute = require("./routes/patient.route");

const app= express();
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get("/",(req,res)=>{
    res.send("Welcome to Server")
 })

app.use("/doctor",signRoute)
app.use("/patient",patientRoute)
app.use("/medicine",medicineRoute)
const PORT =process.env.PORT||8080
app.listen(PORT, async () => {
    try {
      await connection;
      console.log("connected to db")
    } catch (e) {
      console.log(e);
    }
  });