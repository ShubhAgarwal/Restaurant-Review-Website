const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DishSchema = new Schema({
    name: {
        type: String,
        required: [true, "FIELD IS COMPULSARY"],
        unique: true
    },
    descr: {
        type: String,
        maxLength: 240
    },
    image: {
        type: String,
        match: [/^\w+\.(png|jpg|jpeg)$/, "GIVEN FILE IS NOT A VALID IMAGE"],
        default: 'default.jpg'
    },
    category: {
        type: String,
        required: [true, "FIELD IS COMPULSARY"]
    },
    price: {
        type: Number,
        required: [true, "FIELD IS COMPULSARY"],
        min: 0
    }
});

const Dishes = mongoose.model('Dishes', DishSchema);

module.exports = Dishes;