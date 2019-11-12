const { Router } = require('express');
const routerTypeBook = Router();
const { TypeBookService } = require('../services/typeBook.service');

routerTypeBook.get('/', (req, res) => {
    TypeBookService.getAll()
        .then(typeBooks => { res.send({ success: true, typeBooks }) })
        .catch(res.onError);
});

routerTypeBook.get('/',(req,res)=>{
    TypeBookService.getById(req.params._id)
    .then(reader=>res.send({success: true,reader}))
    .catch(res.onError)
});

routerTypeBook.get('/:_id', (req, res) => {
    TypeBookService.getById(req.params._id)
        .then(typeBook => { res.send({ success: true, typeBook }) })
        .catch(res.onError)
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