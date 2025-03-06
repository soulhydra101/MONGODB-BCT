const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/eventDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"));

const Event = mongoose.model("Event", new mongoose.Schema({ 
    title: String, date: String, location: String, description: String 
}));

const Participant = mongoose.model("Participant", new mongoose.Schema({ 
    name: String, email: String, eventId: String 
}));

// ✅ Create an Event
app.post("/events", async (req, res) => res.send(await new Event(req.query).save()));

// ✅ Register a Participant
app.post("/participants", async (req, res) => res.send(await new Participant(req.query).save()));

// ✅ Fetch All Events
app.get("/events", async (req, res) => res.send(await Event.find()));

// ✅ Update Event Details
app.patch("/updateevent", async (req, res) => {
    const { id, ...updateData } = req.query;
    if (!id) return res.status(400).send({ message: "Event ID is required" });
    res.send(await Event.findByIdAndUpdate(id, updateData, { new: true }));
});

// ✅ Delete an Event
app.delete("/deleteevent", async (req, res) => {
    if (!req.query.id) return res.status(400).send({ message: "Event ID is required" });
    res.send(await Event.findByIdAndDelete(req.query.id));
});

app.listen(5000, () => console.log("Server running on port 5000"));
