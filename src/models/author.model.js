const mongoose = require('mongoose');
const { Schema } = mongoose;

const authorShema = new Schema({
    name: { type: String, require: true, trim: true},
    note: { type: String, trim: true },
    nativeCountry: { type: String, trim: true, },
    penName: { type: String, trim: true },
    birthDay: { type: String, trim: true, required: true },
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

const Author = mongoose.model('Author', authorShema);
module.exports = { Author };
