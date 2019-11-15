const { Router } = require('express');
const { BookService } = require('../services/book.service');
const routerBook = Router({ mergeParams: true });


routerBook.get('/', (req, res) => {
    BookService.getAll()
        .then(books => res.send({ success: true, books }))
        .catch(res.onError);
});

routerBook.get('/getcboAuthors', (req, res) => {
    BookService.getcboAuthors()
        .then(authors => res.send({ success: true, authors }))
        .catch(res.onError)
})


routerBook.get('/getcboPublishers', (req, res) => {
    BookService.getcboPublishers()
        .then(publishers => res.send({ success: true, publishers }))
})

routerBook.get('/getcboTypeBook', (req, res) => {
    BookService.getcboTypeBooks()
        .then(typeBooks => res.send({ success: true, typeBooks }))
        .catch(res.onError)
})

routerBook.get('/:_id', (req, res) => {
    BookService.getById(req.params._id)
        .then(book => res.send({ success: true, book }))
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
    BookService.updateBook(req.params._id, content)
        .then(book => { res.send({ success: true, book }); })
        .catch(res.onError);
})

routerBook.delete('/:_id', (req, res) => {
    BookService.removeBook(req.params._id)
        .then(book => { res.send({ success: true, book }) })
        .catch(res.onError);
})
module.exports = { routerBook };