const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
    name: { type: String, trim: true, required: true },
    datePublish: { type: Date, trim: true, require: true },
    price: { type: Number, trim: true, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'Author' },
    typeBooks: [{ type: Schema.Types.ObjectId, ref: 'TypeBook' }],
    publisher: { type: Schema.Types.ObjectId, ref: 'Publisher' }
})

const Book = mongoose.model('Book', bookSchema);
module.exports = { Book };