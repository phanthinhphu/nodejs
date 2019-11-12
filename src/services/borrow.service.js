const { Card } = require('../models/card.model');
const { Book } = require('../models/book.model');
const { User } = require('../models/user.model');
const { Borrow } = require('../models/borrow.model');
const { MyError } = require('../helpers/myError');
const { checkObjectId } = require('../helpers/checkObjectId');
const { borrowValidate } = require('../validates/borrow.validate');
class BorrowService {

    static getAll() {
        const queryBorrow = [
            { path: 'User', select: '_id name' },
            { path: 'Book', select: '_id name' },
            {
                path: 'Card',
                select: '_id name',
                populate: {
                    path: 'Reader',
                    select: 'name'
                }
            }
        ]
        return Borrow.find({}).populate(queryBorrow);
    }

    static async createBorrow(content) {
        const idUser = content.user;
        const idBook = content.books;
        const idCard = content.card;
        checkObjectId(idUser, idCard, idBook);

        await borrowValidate.validateAsync(content)
            .catch(res.onError)

        const filterBookExist = {
            '_id': { $in: idBook },
            'status': true
        }
        const findBook = await Book.find(filterBookExist);
        if (findBook) throw new MyError('THE_BOOK_HAVE_BEEN_BORROWED');
        const borrow = new Borrow(content);
        this.borrowBook(idBook, true);
        return borrow.save();
    }

    static repayBook(_ids) {
        this.borrowBook(_ids, false);
        return Book.find({
            '_id': { $in: _ids }
        }).select('_id name');
    }

    static async borrowBook(_ids, status) {
        const filterUpdateBook = {
            '_id': { $in: _ids },
            'status': !status
        }

        const setBook = { $set: { 'status': status } };
        try {
            await Book.updateMany(filterUpdateBook, setBook);
        }
        catch (error) {
            throw new MyError('INVALID_BOOK', 400);
        }
    }

    static async removeBorrow(_id) {
        const findborrow = await Borrow.find({ _id });
        if (!findborrow) throw new MyError('CAN_NOT_FIND_BORROW', 400);
        const findBook = await Book.find({
            '_id': { $in: findborrow.books },
            'status': 'true'
        });
        if (findBook) throw new MyError('BOOKS_HAVE_NOT_REPLIED');
        const borrow = await Borrow.findByIdAndRemove(_id);
        return borrow;;
    }
}

module.exports = { BorrowService };