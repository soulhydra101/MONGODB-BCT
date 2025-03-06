const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/hospitalDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"));

const Patient = mongoose.model("Patient", new mongoose.Schema({ 
    name: String, age: Number, disease: String, doctorID: String 
}));

const Doctor = mongoose.model("Doctor", new mongoose.Schema({ 
    name: String, specialization: String, doctorID: String 
}));

// ✅ Register Patients
app.post("/patients", async (req, res) => res.send(await new Patient(req.query).save()));

// ✅ Register Doctors
app.post("/doctors", async (req, res) => res.send(await new Doctor(req.query).save()));

// ✅ Assign a Doctor to a Patient
app.patch("/updatepatient", async (req, res) => {
    const { id, doctorID } = req.query;
    if (!id || !doctorID) return res.status(400).send({ message: "Patient ID and Doctor ID are required" });
    res.send(await Patient.findByIdAndUpdate(id, { doctorID }, { new: true }));
});

// ✅ Get All Patients of a Doctor
app.get("/doctors", async (req, res) => {
    if (req.query.patients) return res.send(await Patient.find({ doctorID: req.query.id }));
    res.send(await Doctor.findById(req.query.id));
});

// ✅ Delete Patient Record
app.delete("/deletepatient", async (req, res) => {
    if (!req.query.id) return res.status(400).send({ message: "Patient ID is required" });
    res.send(await Patient.findByIdAndDelete(req.query.id));
});

// ✅ Delete Doctor Record
app.delete("/deletedoctor", async (req, res) => {
    if (!req.query.id) return res.status(400).send({ message: "Doctor ID is required" });
    res.send(await Doctor.findByIdAndDelete(req.query.id));
});

app.listen(5000, () => console.log("Server running on port 5000"));
