const { MyError } = require('../helpers/myError');
const { checkObjectId } = require('../helpers/checkObjectId');
const { Author } = require('../models/author.model');
const { authorValidate } = require('../validates/author.validate');

class AuthorService {

    static getAll() {
        return Author.find({}, { books: 0 });
    }

    static getById(_id) {

        checkObjectId(_id);

        const author = Author.findById(_id, { books: 0 });
        if (!author) throw new MyError('CAN_NOT_FIND_AUTHOR', 404);
        return author;
    }

    static async createAuthor(content) {
        await authorValidate.validateAsync(content)
            .catch(error => { throw new MyError(error.message, 400); });

        const author = new Author(content);
        const objAuthor = await author.save();
        return this.getObjectAuthor(objAuthor);
    }

    static async updateAuthor(_id, content) {

        checkObjectId(_id);

        await authorValidate.validateAsync(content)
            .catch(error => { throw new MyError(error.message, 400); });

        const author = await Author.findByIdAndUpdate(_id, content, { new: true });
        if (!author) throw new MyError('CAN_NOT_FIND_AUTHOR', 404);
        return this.getObjectAuthor(author);
    }

    static async removeAuthor(_id) {

        checkObjectId(_id);
        
        const author = await Author.findByIdAndRemove(_id);
        if (!author) throw new MyError('CAN_NOT_FIND_AUTHOR', 404);
        return this.getObjectAuthor(author);
    }

    static getObjectAuthor(author) {
        const objAuthor = author.toObject();
        delete objAuthor.books;
        return objAuthor;
    }
}

module.exports = { AuthorService };