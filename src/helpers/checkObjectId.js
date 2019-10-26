const mongoose = require('mongoose');
const { MyError } = require('../helpers/myError');
function checkObjectId(...ids) {
    ids.forEach(id => {
        const objectId = mongoose.Types.ObjectId.isValid(id);
        if (!objectId) throw new MyError('INVALID_ID',400);
    });
}
module.exports = { checkObjectId };
