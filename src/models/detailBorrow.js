const mongoose = require('mongoose');

const { Schema } = mongoose;

const detailBorrowSchema = new Schema({
    isBorrow: { type: Boolean, required: true, trim: true, },
    dateBorrow: { type: Date, required: true, trim: true },
    note: { type: String, trim: true },
    borrow: { type: Schema.Types.ObjectId, ref: 'Borrow' },
    book: { type: Schema.Types.ObjectId, ref: 'Book' }
});

const DetailBorrow = mongoose.model('DetailBorrow', detailBorrowSchema);
module.exports = { DetailBorrow };