const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const { routerAuthor } = require('./controllers/author.router');
const { routerBook } = require('./controllers/book.router');
const { routerReader } = require('./controllers/reader.router');
const { routerCard } = require('./controllers/card.router');
const { routerTypeBook } = require('./controllers/typeBook.router');
const { routerUser } = require('./controllers/user.router');
const { routerPublisher } = require('./controllers/publisher.router');
const { routerBorrow } = require('./controllers/borrow.router');
const { mustBeUser }  = require('./helpers/mustBeUser');
const app = express();

app.use(json());
app.use(cors());
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
app.use('/typebook',routerTypeBook);
app.use('/user',routerUser);
app.use('/publisher',routerPublisher);
app.use('/borrow',routerBorrow);
module.exports = { app };