const { MyError } = require('../helpers/myError');
const { checkObjectId } = require('../helpers/checkObjectId');
const { Author } = require('../models/author.model');

class AuthorService {
    static getAll() {
        return Author.find({});
    }

    static async createAuthor(content) {
        const author = new Author(content);
        return await author.save();
    }

    static async updateAuthor(_id, content) {
        try{
            checkObjectId(_id);
            const author = await Author.findByIdAndUpdate(_id, content, { new: true });
            if (!author) throw new MyError('CAN_NOT_FIND_AUTHOR', 404);
            return author;
        }catch(e){
            throw new Error(e);
        }

    }

    static async removeAuthor(_id) {
        checkObjectId(_id);
        const author = await Author.findByIdAndRemove(_id);
        if (!author) throw new MyError('CAN_NOT_FIND_AUTHOR', 404);
        return author;
    }
}

module.exports = { AuthorService };