const mongoose = require('mongoose');

const { Schema } = mongoose;

const employeeSchema = new Schema({
    name: { type: String, required: true, trim: true },
    birthDay: { type: Date, required: true, trim: true },
    phone: { type: Number, required: true, max: 10, min: 5, trim: true }
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = { Employee };