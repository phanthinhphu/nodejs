const { Card } = require('../models/card.model');
const { cardValidate } = require('../validates/card.validate');
const { checkObjectId } = require('../helpers/checkObjectId');
const { MyError } = require('../helpers/myError');
const { Reader } = require('../models/reader.model');

class CardService {

    static getAll() {
        return Card.find({}).populate('reader', 'name');
    }

    static async getById(_id) {
        checkObjectId(_id);
        const card = await Card.findById(_id);
        if (!card) throw new MyError('CAN_NOT_FIND_CARD', 404);
        return card;
    }

    static async createCard(content) {
        const idReader = content.reader;
        checkObjectId(idReader);

        await cardValidate.validateAsync(content)
            .catch(error => { throw new MyError(error.message, 400) })

        const findSeries = await Card.findOne({ seriesNumber: content.seriesNumber });
        if (findSeries) throw new MyError('SERIESNUMBER_EXIST', 400);

        const seriesNumberExist = await Reader.findOne({ cards: idReader });
        if (seriesNumberExist) throw new MyError('SERIESNUMBER_EXIST', 400);

        const card = new Card(content);
        const pushCard = { $push: { cards: card._id } };
        const reader = await Reader.findByIdAndUpdate(idReader, pushCard, { new: true });
        if (!reader) throw new MyError('CAN_NOT_FIND_READER')
        return card.save();
    }

    static async updateCard(idCard, content) {
        const idReader = content.reader;
        const series = content.seriesNumber;
        checkObjectId(idCard, idReader);
        await cardValidate.validateAsync(content)
            .catch(error => { throw new MyError(error.message, 400) });

        const findCard = await Card.findById(idCard);
        if (findCard.seriesNumber != series)
            throw new MyError('INVALID_SERIESNUMBER');

        const card = await Card.findByIdAndUpdate(idCard, content, { new: true });
        if (!card) throw new MyError('CAN_NOT_FIND_CARD', 404);
        const pullReader = { $pull: { cards: idCard } };
        await Reader.findOneAndUpdate({ cards: idCard }, pullReader);
        const pushCard = { $push: { cards: idCard } };
        await Reader.findByIdAndUpdate(idReader, pushCard);
        return card;
    }

    static async removeCard(idCard) {
        checkObjectId(idCard);
        const card = await Card.findByIdAndRemove(idCard);
        if (!card) throw new MyError('CAN_NOT_FIND_CARD', 404);
        const pullCard = { $pull: { cards: idCard } };
        await Reader.findOneAndUpdate({ cards: idCard }, pullCard);
        return card;
    }
}

module.exports = { CardService };