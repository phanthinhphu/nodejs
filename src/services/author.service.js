const { MyError } = require('../helpers/myError');
const { checkObjectId } = require('../helpers/checkObjectId');
const { Author } = require('../models/author.model');
const { authorValidate } = require('../validates/author.validate');

class AuthorService {

    static getAll() {
        return Author.find({});
    }

    static getId(_id) {
        const author = Author.findById(_id);
        if (!author) throw new MyError('CAN_NOT_FIND_AUTHOR', 404);
        return author;
    }

    static async createAuthor(content) {
        await authorValidate.validateAsync(content)
            .catch(error => { throw new MyError(error.message, 400); });
        const author = new Author(content);
        return await author.save();
    }

    static async updateAuthor(_id, content) {
        checkObjectId(_id);
        await authorValidate.validateAsync(content)
            .catch(error => { throw new MyError(error.message, 400); });
        const author = await Author.findByIdAndUpdate(_id, content, { new: true });
        if (!author) throw new MyError('CAN_NOT_FIND_AUTHOR', 404);
        return author;
    }

    static async removeAuthor(_id) {
        checkObjectId(_id);
        const author = await Author.findByIdAndRemove(_id);
        if (!author) throw new MyError('CAN_NOT_FIND_AUTHOR', 404);
        return author;
    }
}

module.exports = { AuthorService };