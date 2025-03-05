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




const getUsers = () => {
    User.find()
        .then(users => console.log("Users:", users))
        .catch(err => console.log("Error:", err));
};


// Call functions manually
//createUser();
 getUsers();

// // Replace "your_valid_user_id_here" with an actual ID from your database

//updateUser("67c7c34a0569d88bb81e1982");
 //deleteUser("67c7c34a0569d88bb81e1982");
