const { Router } = require('express');
const routerAuthor = Router();
const { AuthorService } = require('../services/author.service');

routerAuthor.get('/', (req, res) => {
    AuthorService.getAll()
        .then(authors => res.send({ success: true, authors }))
        .catch(res.onError);
});

routerAuthor.post('/', async (req, res) => {
    AuthorService.createAuthor(req.body)
        .then(author => res.send({ success: true, author }))
        .catch(res.onError);
});

routerAuthor.put('/:_id', async (req, res) => {
    AuthorService.updateAuthor(req.params._id, req.body)
        .then(author => res.send({ success: true, author }))
        .catch(res.onError);
});

routerAuthor.delete('/:_id', (req, res) => {
    AuthorService.removeAuthor(req.params._id)
        .then(author => res.send({ success: true, author }))
        .catch(res.onError);
});

module.exports = { routerAuthor };