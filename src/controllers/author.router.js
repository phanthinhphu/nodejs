const { Router } = require('express');
const routerAuthor = Router();
const Joi = require('@hapi/joi');
const { AuthorService } = require('../services/author.service');
const { authorValidate } = require('../validates/author.validate');

routerAuthor.get('/', (req, res) => {
    AuthorService.getAll()
        .then(authors => res.send({ success: true, authors }));
});

routerAuthor.post('/', async (req, res) => {
    try {
        await authorValidate.validateAsync(req.body);
    } catch (error) {
        const body = { success: false, message: error.message };
        res.status(404).send(body);
        return false;
    }
    authorValidate.valid();
    AuthorService.createAuthor(req.body)
        .then(author => res.send({ success: true, author }))
        .catch(error => res.onError)
});

routerAuthor.put('/:_id',async (req, res) => {
    try {
        await authorValidate.validateAsync(req.body);
    } catch (error) {
        const body = { success: false, message: error.message };
        res.status(404).send(body);
        return false;
    }
    AuthorService.updateAuthor(req.params._id,req.body)
    .then(author => res.send({success : true, author}))
    .catch(res.onError);
});

routerAuthor.delete('/:_id',(req,res)=>{
    AuthorService.removeAuthor(req.params._id)
    .then(author => res.send({ success: true, author }))
    .catch(res.onError);
});

module.exports = { routerAuthor };