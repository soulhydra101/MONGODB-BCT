const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/schoolDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"));

const Student = mongoose.model("Student", new mongoose.Schema({ name: String, age: Number, roll: Number, class: String, TeacherId: String }));
const Teacher = mongoose.model("Teacher", new mongoose.Schema({ name: String, email: String, subject: String, TeacherId: String }));

// ✅ Create Student
app.post("/students", async (req, res) => res.send(await new Student(req.query).save()));

// ✅ Create Teacher
app.post("/teachers", async (req, res) => res.send(await new Teacher(req.query).save()));

// ✅ Assign a Teacher / Update Student
app.patch("/updatestudent", async (req, res) => {
    const { id, ...updateData } = req.query;
    if (!id) return res.status(400).send({ message: "Student ID is required" });
    res.send(await Student.findByIdAndUpdate(id, updateData, { new: true }));
});

// ✅ Get All Students of a Teacher
app.get("/studentsbyteacher", async (req, res) => {
    if (!req.query.TeacherId) return res.status(400).send({ message: "Teacher ID is required" });
    res.send(await Student.find({ TeacherId: req.query.TeacherId }));
});

// ✅ Delete a Student
app.delete("/deletestudent", async (req, res) => {
    if (!req.query.id) return res.status(400).send({ message: "Student ID is required" });
    res.send(await Student.findByIdAndDelete(req.query.id));
});

// ✅ Delete a Teacher
app.delete("/deleteteacher", async (req, res) => {
    if (!req.query.id) return res.status(400).send({ message: "Teacher ID is required" });
    res.send(await Teacher.findByIdAndDelete(req.query.id));
});


app.listen(5000, () => console.log("Server running on port 5000"));
