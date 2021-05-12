const mongoose = require('mongoose');

const Dishes = require('./models/dishes');
const Users = require('./models/users');

mongoose.connect("mongodb://localhost:27017/Dish_Review_Database", { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', function(){
    console.log("Connected Successfully.");
}).on('error', function(error){
    console.log("Connection error: " + error);
});

Dishes.collection.drop();
Users.collection.drop();

// Dishes.find().then((result) => {console.log(result)});
// Users.find().then((result) => {console.log(result)});