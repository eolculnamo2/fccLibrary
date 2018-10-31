const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Book = new Schema({
    title: String,
    likes: Number,
    comments: Array
})

module.exports = mongoose.model('books', Book);