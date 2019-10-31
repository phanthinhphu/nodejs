const { Router } = require('express');
const { ReaderService } = require('../services/reader.service');
const routerReader = Router();

routerReader.get('/', (req, res) => {
    ReaderService.getAll()
        .then(readers => { res.send({ success: true, readers }) })
        .catch(res.onError);
})

routerReader.post('/', (req, res) => {
    ReaderService.createReader(req.body)
        .then(reader => { res.send({ success: true, reader }) })
        .catch(res.onError);
});

routerReader.put('/:_id', (req, res) => {
    ReaderService.updateReader(req.params._id, req.body)
        .then(reader => { res.send({ success: true, reader }) })
        .catch(res.onError);
});

routerReader.delete('/:_id', (req, res) => {
    ReaderService.removeReader(req.params._id)
        .then(reader => { res.send({ success: true, reader }) })
        .catch(res.onError);
});

module.exports = { routerReader };