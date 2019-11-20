const { Card } = require('../models/card.model');
const { Book } = require('../models/book.model');
const { User } = require('../models/user.model');
const { Borrow } = require('../models/borrow.model');
const { MyError } = require('../helpers/myError');
const { checkObjectId } = require('../helpers/checkObjectId');
const { borrowValidate,updateBorrowValidate } = require('../validates/borrow.validate');

const queryBorrow = [
    { path: 'user', select: 'name' },
    { path: 'books', select: 'name' },
    {
        path: 'card',
        select: 'name',
        populate: {
            path: 'reader',
            select: 'name'
        }
    }
]

class BorrowService {

    static getAll() {
        return Borrow.find({}).populate(queryBorrow);
    }

    static async getById(id) {

        checkObjectId(id);

        const borrow = await Borrow.findById(id);
        if (!borrow) throw new MyError('CAN_NOT_FIND_BORROW', 400);
        const populateBook = await Borrow.populate(borrow, queryBorrow);
        return populateBook;
    }

    static getCards() {
        const today = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
        const options = {
            endDate: { $gte: today }
        }
        return Card.find(options, { _id: 1 })
            .populate('reader', 'name phone');
    }

    static async getBooks(_id) {
        let books = [];
        if (_id != 1) {
            checkObjectId(_id)
            const selectBook = await Borrow.findById(_id, { books: 1 });
            if (!books) throw new MyError('CAN_NOT_FIND_BORROW', 400);
            books = selectBook.books;
        }
        const option = {
            $or: [
                { status: false },
                { _id: { $in: books } }

            ]
        }
        return Book.find(option).select('name');
    }

    static async createBorrow(content) {

        const idUser = content.user;
        const idBook = content.books;
        const idCard = content.card;

        checkObjectId(idUser, idCard, idBook);

        await borrowValidate.validateAsync(content)
            .catch(error => { throw new MyError(error.message, 400); });

        const filterBookExist = {
            '_id': { $in: idBook },
            'status': true
        }
        const findBook = await Book.find(filterBookExist);
        if (findBook.length) throw new MyError('THE_BOOK_HAVE_BEEN_BORROWED', 400);
        const borrow = new Borrow(content);
        this.borrowBook(idBook, true);
        const saveBorrow = await borrow.save();
        return Borrow.populate(saveBorrow, queryBorrow);
    }

    static async updateBorrow(_id, content) {

        const idUser = content.user;
        const idBook = content.books;
        const idCard = content.card;

        checkObjectId(idUser, idCard, idBook);

        await updateBorrowValidate.validateAsync(content)
            .catch(error => { throw new MyError(error.message, 400); });

        const selectBook = await Borrow.findById(_id, { books: 1 });
        if (!selectBook) throw new MyError('CAN_NOT_FIND_BORROW', 404)

        await this.borrowBook(selectBook.books, false);

        const filterBookExist = {
            '_id': { $in: idBook },
            'status': true
        }
        const findBook = await Book.find(filterBookExist);
        if (findBook.length) throw new MyError('THE_BOOK_HAVE_BEEN_BORROWED', 400);

        const borrow = await Borrow.findByIdAndUpdate(_id, content);
        if (!borrow) throw new MyError('CAN_NOT_FIND_BORROW', 404);

        await this.borrowBook(idBook, true);

        return Borrow.populate(borrow, queryBorrow);
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
        return borrow;
    }
}

module.exports = { BorrowService };