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


const deleteUser = (id) => {
    if (!isValidId(id)) return console.log("Invalid ID");
    User.findByIdAndDelete(id)
        .then(user => console.log("User Deleted:", user))
        .catch(err => console.log("Error:", err));
};

// Call functions manually
// // Replace "your_valid_user_id_here" with an actual ID from your database

 deleteUser("67c7c5b250ac49b1a9d54235");
