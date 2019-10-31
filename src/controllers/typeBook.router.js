const { Router } = require('express');
const routerTypeBook = Router();
const { TypeBookService } = require('../services/typeBook.service');

routerTypeBook.get('/', (req, res) => {
    TypeBookService.getAll()
        .then(typeBook => { res.send({ success: true, typeBook }) })
        .catch(res.onError);
});

routerTypeBook.post('/', (req, res) => {
    TypeBookService.createTypeBook(req.body)
        .then(typeBook => { res.send({ success: true, typeBook }) })
        .catch(res.onError);
});

routerTypeBook.put('/:_id', (req, res) => {
    TypeBookService.updateTypeBook(req.params._id, req.body)
        .then(typeBook => { res.send({ success: true, typeBook }) })
        .catch(res.onError);
});

routerTypeBook.delete('/:_id', (req, res) => {
    TypeBookService.removeTypeBook(req.params._id)
        .then(typeBook => { res.send({ success: true, typeBook }) })
        .catch(res.onError);
});

module.exports = { routerTypeBook }; 