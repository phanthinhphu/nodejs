const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    birthDay: { type: Date, required: true, trim: true },
    phone: { type: String, required: true, max: 10, min: 5, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true, min: 10, max: 50 }
});

const User = mongoose.model('User', userSchema);
module.exports = { User };