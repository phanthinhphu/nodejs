const mongoose = require('mongoose');

const { Schema } = mongoose;

const borrowSchema = new Schema({
    dateBorrow: { type: Date, trim: true, required: true },
    card: { type: Schema.Types.ObjectId, ref: 'Card' },
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const Borrow = mongoose.model('Borrow', borrowSchema);
module.exports = { Borrow };