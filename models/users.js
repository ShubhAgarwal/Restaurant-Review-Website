const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    phoneno: {
        type: Number,
        required: [true, "FIELD IS COMPULSARY"],
        unique: [true, "ALREADY EXISTS"],
        minLength: 10,
        maxLength: 12
    },
    password: {
        type: String,
        required: [true, "FIELD IS COMPULSARY"],
        hidden: true
    },
    fullname: {
        type: String,
        default: "",
        match: [/^[a-zA-Z]$/, "DATA IS NOT A VALID NAME"]
    },
    email: {
        type: String,
        default: "",
        match: [/^[a-zA-z0-9\._]+(@)[a-z]+(\.)[a-z]{2,3}$/, "GIVEN DATA IS NOT A VALID EMAIL"]
    },
    image: {
        type: String,
        match: [/^\w+\.(png|jpg|jpeg)$/, "GIVEN FILE IS NOT A VALID IMAGE"],
        default: "person.jpg"
    }
});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;