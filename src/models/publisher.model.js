const mongoose = require('mongoose');

const { Schema } = mongoose;

const publisherSchema = new Schema({
    name: { type: String, trim: true, required: true },
    address: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

const Publisher = mongoose.model('Publisher', publisherSchema);
module.exports = { Publisher };