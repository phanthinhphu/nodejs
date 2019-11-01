const { Publisher } = require('../models/publisher.model');
const { publisherValidate } = require('../validates/publisher.validate');
const { checkObjectId } = require('../helpers/checkObjectId');
const { MyError } = require('../helpers/myError');

class PublisherService {

    static getAll() {
        return Publisher.find({});
    }

    static async createPublisher(content) {
        await publisherValidate.validateAsync(content)
            .catch(error => { throw new MyError(error.message, 400) })
        const findEmail = await Publisher.findOne({ email: content.email });
        if (findEmail) throw new MyError('EMAIL_EXIST', 400);
        const publisher = new Publisher(content);
        return publisher.save();
    }

    static async updatePublisher(_id, content) {
        checkObjectId(_id);
        await publisherValidate.validateAsync(content)
            .catch(error => { throw new MyError(error.message, 400) });

        const publisher = await Publisher.findByIdAndUpdate(_id, content, { new: true });
        if (!publisher) throw new MyError('CAN_NOT_FIND_PUBLISHER', 404);
        return publisher;
    }

    static async removePublisher(_id) {
        checkObjectId(_id);
        const publisher = await Publisher.findByIdAndRemove(_id);
        if (!publisher) throw new MyError('CAN_NOT_FIND_PUBLISHER', 404);
        return publisher;
    }
}

module.exports = { PublisherService };