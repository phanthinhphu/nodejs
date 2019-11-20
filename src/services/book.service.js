const { Book } = require('../models/book.model');
const { bookValidate } = require('../validates/book.validate');
const { Author } = require('../models/author.model');
const { MyError } = require('../helpers/myError');
const { checkObjectId } = require('../helpers/checkObjectId');
const { TypeBook } = require('../models/typeBook.model');
const { Publisher } = require('../models/publisher.model');

const bookPopulate = [
    { path: 'author', select: 'name' },
    { path: 'publisher', select: 'name' },
    { path: 'typeBooks', select: 'name' }
]

class BookService {

    static async getAll() {
        const books = await Book.find({});
        return Book.populate(books,bookPopulate)
    }

    static async getById(_id) {

        checkObjectId(_id);

        const book = await Book.findById(_id);
        if (!book) throw new MyError('CAN_NOT_FIND_BOOK', 404);
        return Book.populate(book,bookPopulate);
    }

    static getcboAuthors() {
        return Author.find({}).select('name');
    }

    static getcboPublishers() {
        return Publisher.find({}).select('_id name')
    }

    static getcboTypeBooks() {
        return TypeBook.find({}).select('_id name')
    }

    static async createBook(content) {

        const idAuthor = content.author;
        const idTypeBook = content.typeBooks;
        const idPublisher = content.publisher;

        checkObjectId(idAuthor, idTypeBook, idPublisher);
        await bookValidate.validateAsync(content)
            .catch(error => { throw new MyError(error.message, 400); });
        
        const book = new Book(content);
        const pushBook = { $push: { books: book._id } };

        const author = await Author.findByIdAndUpdate(idAuthor, pushBook);
        if (!author) throw new MyError('CAN_NOT_FIND_AUTHOR', 404);

        const findTypeBooks = { _id: { $in: idTypeBook } }
        const typeBook = await TypeBook.updateMany(findTypeBooks, pushBook, { multi: true });
        if (!typeBook) throw new MyError('CAN_NOT_FIND_TYPEBOOK');

        const publisher = await Publisher.findByIdAndUpdate(idPublisher, pushBook);
        if (!publisher) throw new MyError('CAN_NOT_FIND_PUBLISHER', 404);
        const saveBook = await book.save();

        return Book.populate(saveBook, bookPopulate)
    }

    static async updateBook(idBook, content) {

        const idAuthor = content.author;
        const idTypeBook = content.typeBooks;
        const idPublisher = content.publisher;

        checkObjectId(idBook, idAuthor, idTypeBook);

        await bookValidate.validateAsync(content)
            .catch(error => { throw new MyError(error.message, 400) });

        const book = await Book.findByIdAndUpdate(idBook, content, { new: true });
        if (!book) throw new MyError('CAN_NOT_FIND_BOOK', 404);

        const filterBook = { books: idBook };
        const filterBooks = { _id: { $in: idTypeBook } };
        const pullBook = { $pull: { books: idBook } };
        const pushBook = { $push: { books: idBook } };

        await Author.findOneAndUpdate(filterBook, pullBook);
        const author = await Author.findByIdAndUpdate(idAuthor, pushBook);
        if (!author) throw new MyError('CAN_NOT_FIND_AUTHOR', 404);

        await TypeBook.updateMany(filterBook, pullBook);
        const typeBook1 = await TypeBook.updateMany(filterBooks, pushBook);
        if (!typeBook1) throw new MyError('CAN_NOT_FIND_TYPEBOOK', 404);

        await Publisher.findOneAndUpdate(filterBook, pullBook);
        const publisher = await Publisher.findByIdAndUpdate(idPublisher, pushBook);
        if (!publisher) throw new MyError('CAN_NOT_FIND_PUBLISHER', 404);

        return Book.populate(book, bookPopulate);
    }

    static async removeBook(idBook) {

        checkObjectId(idBook);

        const book = await Book.findByIdAndRemove(idBook, { new: true });
        if (!book) throw new MyError('CAN_NOT_FIND_BOOK', 404);

        const pullBook = { $pull: { books: idBook } };
        const filterBook = { books: idBook };

        await Author.findOneAndUpdate(filterBook, pullBook);
        await TypeBook.updateMany(filterBook, pullBook);
        await Publisher.findOneAndUpdate(filterBook, pullBook);

        return Book.populate(book, bookPopulate);
    }
}

module.exports = { BookService }; 