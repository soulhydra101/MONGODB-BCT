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

const createUser = () => {
    User.create({ name: "Alice", email: "alice@example.com", age: 22 })
        .then(user => console.log("User Created:", user))
        .catch(err => console.log("Error:", err));
};

const getUsers = () => {
    User.find()
        .then(users => console.log("Users:", users))
        .catch(err => console.log("Error:", err));
};

const updateUser = (id) => {
    if (!isValidId(id)) return console.log("Invalid ID");
    User.findByIdAndUpdate(id, { age: 25 }, { new: true })
        .then(user => console.log("User Updated:", user))
        .catch(err => console.log("Error:", err));
};

const deleteUser = (id) => {
    if (!isValidId(id)) return console.log("Invalid ID");
    User.findByIdAndDelete(id)
        .then(user => console.log("User Deleted:", user))
        .catch(err => console.log("Error:", err));
};

// Call functions manually
//createUser();
 // getUsers();

// // Replace "your_valid_user_id_here" with an actual ID from your database

//updateUser("67c7c34a0569d88bb81e1982");
 //deleteUser("67c7c34a0569d88bb81e1982");
