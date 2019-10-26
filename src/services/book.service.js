const { Book } = require('../models/book.model');
const { bookValidate } = require('../validates/book.validate');
const { Author } = require('../models/author.model');
const { MyError } = require('../helpers/myError');
const { checkObjectId } = require('../helpers/checkObjectId');

class BookService {
    static getAll() {
        return Book.find({}).populate('author', 'name note');
    }

    static async createBook(content) {
        const idAuthor = content.author;
        checkObjectId(idAuthor);
        await bookValidate.validateAsync(content)
            .catch(error => {
                throw new MyError(error.message, 400);
            })
        const book = new Book(content);
        const addToSetBook = { $addToSet: { books: book._id } };
        const author = await Author.findByIdAndUpdate(idAuthor, addToSetBook);
        if (!author) throw new MyError('CAN_NOT_FIND_AUTHOR', 404);
        return book.save();
    }

    static async updateBook(idBook, content) {
        const idAuthor = content.author;
        checkObjectId(idBook, idAuthor);
        await bookValidate.validateAsync(content)
            .catch(error => {
                throw new MyError(error.message, 400)
            });;
        const book = await Book.findByIdAndUpdate(idBook, content, { new: true });
        if (!book) throw new MyError('CAN_NOT_FIND_BOOK', 404);
        const queryAuthor = { books: idBook };
        const pullAuthor = { $pull: { books: idBook } }
        await Author.findOneAndUpdate(queryAuthor, pullAuthor);
        const addToSetBook = { $addToSet: { books: idBook } };
        const author = await Author.findByIdAndUpdate(idAuthor, addToSetBook);
        if (!author) throw new MyError('CAN_NOT_FIND_AUTHOR', 404);
        return book;
    }

    static async removeBook(idBook) {
        checkObjectId(idBook);
        const book = await Book.findByIdAndRemove(idBook);
        if (!book) throw new MyError('CAN_NOT_FIND_BOOK', 404);
        const queryAuthor = { book: idBook };
        await Author.findByIdAndUpdate(queryAuthor, { $pull: { book: idBook } });
        return book;
    }
}

module.exports = { BookService }; 