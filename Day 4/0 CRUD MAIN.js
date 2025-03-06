const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

const User = mongoose.model("User", new mongoose.Schema({ name: String, email: String, age: Number }));

app.post("/adduser", async (req, res) => {
  const user = new User(req.query);
  await user.save();
  res.send(user);
});

app.get("/users", async (req, res) => res.send(await User.find()));
app.get("/users/:id", async (req, res) => res.send(await User.findById(req.params.id)));

app.patch("/updateuser", async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.query.id, req.query, { new: true });
  res.send(updatedUser);
});

app.delete("/deleteuser", async (req, res) => {
  await User.findByIdAndDelete(req.query.id);
  res.send({ message: "User deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
