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

        const card = await Card.findById(_id).populate('reader', 'name');
        if (!card) throw new MyError('CAN_NOT_FIND_CARD', 404);
        return card;
    }

    static getComboboxReader() {
        return Reader.find({}).select('_id name phone');
    }

    static async createCard(content) {

        const idReader = content.reader;

        checkObjectId(idReader);

        await cardValidate.validateAsync(content)
            .catch(error => { throw new MyError(error.message, 400) })

        const options = {
            reader: idReader,
            endDate: { $gte: content.startDate }
        };
        
        const checkStartDate = await Card.findOne(options);
        if (checkStartDate) throw new MyError('CARD_UNEXPIRED', 400);

        const card = new Card(content);
        const addToset = { $addToSet: { cards: card._id } };
        const reader = await Reader.findByIdAndUpdate(idReader, addToset, { new: true });
        if (!reader) throw new MyError('CAN_NOT_FIND_READER')
        
        const saveCard = await card.save();
        
        return Card.populate(saveCard, { path: 'reader', select: 'name' })
    }

    static async updateCard(idCard, content) {

        const idReader = content.reader;

        checkObjectId(idCard, idReader);

        await cardValidate.validateAsync(content)
            .catch(error => { throw new MyError(error.message, 400) });

        const card = await Card.findByIdAndUpdate(idCard, content, { new: true });
        if (!card) throw new MyError('CAN_NOT_FIND_CARD', 404);
        
        const pullReader = { $pull: { cards: idCard } };
        await Reader.findOneAndUpdate({ cards: idCard }, pullReader);
        
        const addToset = { $addToset: { cards: idCard } };
        await Reader.findByIdAndUpdate(idReader, addToset);

        return Card.populate(card, { path: 'reader', select: 'name' });
    }

    static async removeCard(idCard) {

        checkObjectId(idCard);
       
        const card = await Card.findByIdAndRemove(idCard);
        if (!card) throw new MyError('CAN_NOT_FIND_CARD', 404);
        const pullCard = { $pull: { cards: idCard } };

        await Reader.findOneAndUpdate({ cards: idCard }, pullCard);
        return Card.populate(card, { path: 'reader', select: 'name' });
    }
}

module.exports = { CardService };