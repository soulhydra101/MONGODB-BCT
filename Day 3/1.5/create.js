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


// Call functions manually

createUser();