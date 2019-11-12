const { Publisher } = require('../models/publisher.model');
const { publisherValidate } = require('../validates/publisher.validate');
const { checkObjectId } = require('../helpers/checkObjectId');
const { MyError } = require('../helpers/myError');

class PublisherService {

    static getAll() {
        return Publisher.find({}, { books: 0 });
    }

    static async getById(_id){
        const publisher = await Publisher.findById(_id);
        if(!publisher) throw new MyError('CAN_NOT_FIND_PUBLISHER',400)
        return this.getObjectPublisher(publisher);
    }

    static async createPublisher(content) {
        await publisherValidate.validateAsync(content)
            .catch(error => { throw new MyError(error.message, 400) })
        const findEmail = await Publisher.findOne({ email: content.email });
        if (findEmail) throw new MyError('EMAIL_EXIST', 400);
        const publisher = new Publisher(content);
        const savePublisher = await publisher.save();
        return this.getObjectPublisher(savePublisher);
    }

    static async updatePublisher(_id, content) {
        checkObjectId(_id);
        await publisherValidate.validateAsync(content)
            .catch(error => { throw new MyError(error.message, 400) });

        const publisher = await Publisher.findByIdAndUpdate(_id, content, { new: true });
        if (!publisher) throw new MyError('CAN_NOT_FIND_PUBLISHER', 404);
        return this.getObjectPublisher(publisher);
    }

    static async removePublisher(_id) {
        checkObjectId(_id);
        const publisher = await Publisher.findByIdAndRemove(_id);
        if (!publisher) throw new MyError('CAN_NOT_FIND_PUBLISHER', 404);
        return this.getObjectPublisher(publisher);
    }

    static async getObjectPublisher(publisher) {
        const newPublisher = publisher.toObject();
        delete newPublisher.books;
        return newPublisher;
    }
}


module.exports = { PublisherService };