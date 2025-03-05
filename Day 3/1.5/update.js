const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mongoose')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Error:", err));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const User = mongoose.model('User', userSchema);

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const updateUser = (id) => {
    if (!isValidId(id)) return console.log("Invalid ID");
    User.findByIdAndUpdate(id, { name: "Alice roy", age: 25 }, { new: true })
        .then(user => console.log("User Updated:", user))
        .catch(err => console.log("Error:", err));
};

// Replace with an actual valid ObjectId from your database
updateUser("");
