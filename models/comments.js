const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = Schema({
    body: { 
        type: String,
        required: [true, "FIELD IS COMPULSARY"],
        maxLength: 240
    },
    rating: {
        type: Number,
        required: [true, "FIELD IS COMPULSARY"],
        min: 1,
        max: 5
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, "FIELD IS COMPULSARY"]
    },
    dish: {
        type: Schema.Types. ObjectId,
        ref: 'Dishes',
        required: [true, "FIELD IS COMPULSARY"]
    }
}, {
    timestamps: true
}
);

const Comments = mongoose.model('Comments', CommentSchema);

module.exports = Comments;