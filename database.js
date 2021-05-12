const mongoose = require('mongoose');

const Dishes = require('./models/dishes');
const Users = require('./models/users');

mongoose.connect("mongodb://localhost:27017/Dish_Review_Database", { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', function(){
    console.log("Connected Successfully.");
}).on('error', function(error){
    console.log("Connection error: " + error);
});

var dishes = [
    {name: 'Samosa', category: 'Snacks', price: 16, descr: ''},
    {name: 'Veg. Patties', category: 'Snacks', price: 24, descr: ''},
    {name: 'Dal Kachori + Aloo Sabji', category: 'Snacks', price: 60, descr: ''},
    {name: 'Dhokla', category: 'Snacks', price: 40, descr: ''},
    {name: 'Mix Veg.', category: 'North Indian and Main Course', price: 230, descr: ''},
    {name: 'Dal Makhani', category: 'North Indian and Main Course', price: 280, descr: ''},
    {name: 'Shahi Paneer', category: 'North Indian and Main Course', price: 320, descr: ''},
    {name: 'Tandoori Roti', category: 'Breads', price: 15, descr: ''},
    {name: 'Onion Kulcha', category: 'Breads', price: 50, descr: ''},
    {name: 'Plain Naan', category: 'Breads', price: 50, descr: ''},
    {name: 'Stuffed Paneer Naan', category: 'Breads', price: 70, descr: ''},
    {name: 'Steamed Rice', category: 'Rice and Noodles', price: 130, descr: ''},
    {name: 'Jeera Rice', category: 'Rice and Noodles', price: 150, descr: ''},
    {name: 'Veg. Biryani', category: 'Rice and Noodles', price: 195, descr: ''},
    {name: 'Veg. Fried Rice', category: 'Rice and Noodles', price: 150, descr: ''},
    {name: 'Garlic Chilli Noodles', category: 'Rice and Noodles', price: 160, descr: ''},
    {name: 'Hakka Noodles', category: 'Rice and Noodles', price: 180, descr: ''},
    {name: 'Masala Dosa', category: 'South Indian', price: 140, descr: ''},
    {name: 'Veg. Manchurian', category: 'Chinese', price: 195, descr: ''},
    {name: 'Honey Chilli Potato', category: 'Chinese', price: 180, descr: ''}
];

var users = [
    {phoneno: 9999999999, password: 'secret'},
    {phoneno: 9999999998, password: 'secret'},
    {phoneno: 9999999997, password: 'secret'}
];

Dishes.insertMany(dishes)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });

Users.insertMany(users)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });
