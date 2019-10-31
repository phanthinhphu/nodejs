const { Book } = require('../models/book.model');
const { bookValidate } = require('../validates/book.validate');
const { Author } = require('../models/author.model');
const { MyError } = require('../helpers/myError');
const { checkObjectId } = require('../helpers/checkObjectId');
const { TypeBook } = require('../models/typeBook.model');
class BookService {

    static getAll() {
        return Book.find({}).populate('author', 'name note');
    }

    static async createBook(content) {
        const idAuthor = content.author;
        const idTypeBook = content.typeBook;
        checkObjectId(idAuthor, idTypeBook);
        await bookValidate.validateAsync(content)
            .catch(error => { throw new MyError(error.message, 400); });
        const book = new Book(content);

        const pushBook = { $push: { books: book._id } };
        const author = await Author.findByIdAndUpdate(idAuthor, pushBook);
        if (!author) throw new MyError('CAN_NOT_FIND_AUTHOR', 404);
        const typeBook = await TypeBook.findByIdAndUpdate(idTypeBook, pushBook);
        if (!typeBook) throw new MyError('CAN_NOT_FIND_TYPEBOOK');

        return book.save();
    }

    static async updateBook(idBook, content) {
        const idAuthor = content.author;
        const idTypeBook = content.typeBook;
        checkObjectId(idBook, idAuthor, idTypeBook);
        await bookValidate.validateAsync(content)
            .catch(error => { throw new MyError(error.message, 400) });

        const book = await Book.findByIdAndUpdate(idBook, content, { new: true });
        if (!book) throw new MyError('CAN_NOT_FIND_BOOK', 404);

        const filterBook = { books: idBook };
        const pullBook = { $pull: { books: idBook } };
        const setBook = { $set: { books: idBook } };

        await Author.findOneAndUpdate(filterBook, pullBook);
        const author = await Author.findByIdAndUpdate(idAuthor, setBook);
        if (!author) throw new MyError('CAN_NOT_FIND_AUTHOR', 404);

        await TypeBook.findOneAndUpdate(filterBook, pullBook);
        const typeBook = await typeBook.findByIdAndUpdate(idTypeBook, setBook);
        if (!typeBook) throw new MyError('CAN_NOT_FIND_TYPEBOOK', 404);


        return book;
    }

    static async removeBook(idBook) {
        checkObjectId(idBook);
        const book = await Book.findByIdAndRemove(idBook, { new: true });
        if (!book) throw new MyError('CAN_NOT_FIND_BOOK', 404);

        const pullBook = { $pull: { books: idBook } };
        const filterBook = { books: idBook };

        await Author.findOneAndUpdate(filterBook, pullBook);
        await TypeBook.findOneAndUpdate(filterBook, pullBook);;
        return book;
    }
}

module.exports = { BookService }; 