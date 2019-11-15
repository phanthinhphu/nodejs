const { Reader } = require('../models/reader.model');
const { checkObjectId } = require('../helpers/checkObjectId');
const { MyError } = require('../helpers/myError');
const { readerValidate } = require('../validates/reader.validate');

class ReaderService {

    static getAll() {
        return Reader.find({});
    }

    static getById(_id) {

        checkObjectId(_id);
        
        return Reader.findById(_id, { cards: 0 });
    }


    static async createReader(content) {

        await readerValidate.validateAsync(content)
            .catch(error => { throw new MyError(error.message, 400); })
        
            const reader = new Reader(content);
        const saveReader = await reader.save();
        return this.getObjetReader(saveReader);
    }

    static async updateReader(idReader, content) {
        
        checkObjectId(idReader);
       
        await readerValidate.validateAsync()
            .catch(error => { throw new MyError(error.message, 400); });
        
            const reader = await Reader.findByIdAndUpdate(idReader, content, { new: true });
        if (!reader) throw new MyError('CAN_NOT_FIND_READER', 404);
        return this.getObjetReader(reader);
    }

    static async removeReader(_id) {

        checkObjectId(_id);

        const reader = await Reader.findByIdAndRemove(_id);
        if (!reader) throw new MyError('CAN_NOT_FIND_READER', 404);
        return this.getObjetReader(reader);
    }

    static getObjetReader(reader){
        const newReader = reader.toObject();
        delete newReader.cards;
        return  newReader;
    }
}
module.exports = { ReaderService };