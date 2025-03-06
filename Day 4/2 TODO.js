const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/todoDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"));

const Task = mongoose.model("Task", new mongoose.Schema({ 
    title: String, description: String, status: String, dueDate: String 
}));

// ✅ Add a Task
app.post("/tasks", async (req, res) => res.send(await new Task(req.query).save()));

// ✅ Get All Tasks (with optional filtering)
app.get("/tasks", async (req, res) => {
    const filter = req.query.status ? { status: req.query.status } : {};
    res.send(await Task.find(filter));
});

// ✅ Update Task Status
app.patch("/updatetask", async (req, res) => {
    const { id, status } = req.query;
    if (!id) return res.status(400).send({ message: "Task ID is required" });
    res.send(await Task.findByIdAndUpdate(id, { status }, { new: true }));
});

// ✅ Delete a Task
app.delete("/deletetask", async (req, res) => {
    if (!req.query.id) return res.status(400).send({ message: "Task ID is required" });
    res.send(await Task.findByIdAndDelete(req.query.id));
});

app.listen(5000, () => console.log("Server running on port 5000"));
