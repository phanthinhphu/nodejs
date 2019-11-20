const { verify } = require('./jwt');

async function mustBeUser(req, res, next) {
    try {
        const { token } = req.headers;
        const { _id } = await verify(token);
        console.log(_id)
        req.idUser = _id;
        next();
    } catch (error) {
        res.status(400).send({ success: false, message: 'INVALID_TOKEN' });
    }
}

module.exports = { mustBeUser };