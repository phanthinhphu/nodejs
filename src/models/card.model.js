const mongoose = require('mongoose');

const { Schema } = mongoose;

const carSchema = new Schema({
    seriesNumber: {
        type: String,
        trim: true,
        unique: true,
        minlength: 10,
        maxlength: 10,
        required: true
    },
    startDate: { type: Date, trim: true, required: true },
    endDate: { type: Date, trim: true, required: true },
    note: { type: String, trim: true },
    reader: { type: Schema.Types.ObjectId, ref: 'Reader' }
});

const Card = mongoose.model('Card', carSchema);
module.exports = { Card };