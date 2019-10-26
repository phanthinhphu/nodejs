const { Router } = require('express');
const { BookService } = require('../services/book.service');
const routerBook = Router();


routerBook.get('/', (req, res) => {
    BookService.getAll()
        .then(books => res.send({ success: true, books }))
        .catch(res.onError);
});

routerBook.post('/', (req, res) => {
    const content = req.body;
    BookService.createBook(content)
        .then(book => { res.send({ success: true, book }) })
        .catch(res.onError);
});

routerBook.put('/:_id', (req, res) => {
    const content = req.body;
    BookService.updateBook(req.params._id,content)
        .then(book => { res.send({ success: true, book }); })
        .catch(res.onError);
})

routerBook.get('/:_id', (req, res) => {
    BookService.removeBook(req.params._id)
        .then(book => { res.send({ success: true, book }) })
        .catch(res.onError);
})
module.exports = { routerBook };