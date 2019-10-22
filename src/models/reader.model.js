const mongoose = require('mongoose');

const { Schema } = mongoose;

const readerSchema = new Schema({
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    birthDay: { type: Date, required: true, trim: true },
    phone: { type: Number, max: 10, min: 5, trim: true, required: true },
    cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }]
});

const Reader = mongoose.model('Reader', readerSchema);
module.exports = { Reader };