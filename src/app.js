const express = require('express');
const { json } = require('body-parser');
const { routerAuthor } = require('./controllers/author.router');
const { routerBook } = require('./controllers/book.router');
const { routerReader } = require('./controllers/reader.router');
const { routerCard } = require('./controllers/card.router');
const { routerTypeBook } = require('./controllers/typeBook.router');
const { routerUser } = require('./controllers/user.router');
const app = express();

app.use(json());
app.use((req, res, next) => {
    res.onError = function (error) {
        const body = { success: false, message: error.message };
        if (!error.statusCode) console.log(error);
        res.status(error.statusCode || 500).send(body);
    };
    next();
});

app.use('/author', routerAuthor);
app.use('/book', routerBook);
app.use('/reader', routerReader);
app.use('/card', routerCard);
app.use('/typeBook',routerTypeBook);
app.use('/user',routerUser);
module.exports = { app };