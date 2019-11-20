const jwt = require('jsonwebtoken');

const SECRET_KEY = 'sdfgdf98lkn56l45mdf67867';

function sign(obj) {
    return new Promise((resolve, reject) => {
        jwt.sign(obj, SECRET_KEY, { expiresIn: '7d' }, (error, token) => {
            if (error) return reject(error);
            resolve(token);
        })
    });
}

function verify(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET_KEY, (error, obj) => {
            if (error) return reject(error);
            resolve(obj)
        })
    });
}

module.exports = { verify, sign }