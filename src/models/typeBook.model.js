const mongoose = require('mongoose');

const { Schema } = mongoose;

const typeBookSchema = new Schema({
    name: { type: String, trim: true, required: true },
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

const TypeBook = mongoose.model('TypeBook', typeBookSchema);
module.exports = { TypeBook };