const mongoose = require('mongoose');

const { Schema } = mongoose;

const borrowSchema = new Schema({
    startDate: { type: Date, required: true, trim: true },
    endDate: { type: Date, required: true, trim: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    card: { type: Schema.Types.ObjectId, ref: 'Card' },
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    note: { type: String, trim: true },
    status: { type: Boolean, required: true, trim: true, },
});

const Borrow = mongoose.model('Borrow', borrowSchema);
module.exports = { Borrow };