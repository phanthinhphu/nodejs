const mongoose = require('mongoose');

const { Schema } = mongoose;

const carSchema = new Schema({
    startDate: { type: Date, trim: true, required: true },
    endDate: { type: Date, trim: true, required: true },
    note: { type: String, trim: true },
    reader: { type: Schema.Types.ObjectId, ref: 'Reader' }
});

const Card = mongoose.model('Card', carSchema);
module.exports = { Card };