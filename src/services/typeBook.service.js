const { TypeBook } = require('../models/typeBook.model');
const { checkObjectId } = require('../helpers/checkObjectId');
const { MyError } = require('../helpers/myError');
const { typeBookValidate } = require('../validates/typeBooks.validate');

class TypeBookService {

    static getAll() {
        return TypeBook.find({});
    }

    static async createTypeBook(content) {
        await typeBookValidate.validateAsync(content)
            .catch(error => { throw new MyError(error.message, 400) });

        const typeBook = new TypeBook(content);
        return typeBook.save();
    }

    static async updateTypeBook(_id, content) {
        checkObjectId(_id);
        await typeBookValidate.validateAsync(content)
            .catch(error => { throw new MyError(error.message, 400) });
        const typeBook = await TypeBook.findByIdAndUpdate(_id, content, { new: true });
        if (!typeBook) throw new MyError('CAN_NOT_FIND_TYPEBOOK', 404);
        return typeBook;
    }

    static async removeTypeBook(_id) {
        checkObjectId(_id);
        const typeBook = await TypeBook.findByIdAndRemove(_id);
        if (!typeBook) throw new MyError('CAN_NOT_FIND_TYPEBOOK', 400);
        return typeBook;
    }
}

module.exports = { TypeBookService };