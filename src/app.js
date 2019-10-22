const express = require('express');
const { json } = require('body-parser');
const app = express();
const { routerAuthor } = require('./controllers/author.router');

app.use(json());
app.use('/author', routerAuthor);
app.use((req, res, next) => {
    res.onError = function(error) {
        const body = { success: false, message: error.message };
        if (!error.statusCode) console.log(error);
        res.status(error.statusCode || 500).send(body);
    };
    next();
});



module.exports = { app };