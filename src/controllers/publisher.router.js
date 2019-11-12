const { Router } = require('express');
const routerPublisher = Router();
const { PublisherService } = require('../services/publisher.service');

routerPublisher.get('/', (req, res) => {
    PublisherService.getAll()
        .then(publishers => { res.send({ success: true, publishers }) })
        .catch(res.onError);
});

routerPublisher.get('/:_id', (req, res) => {
    PublisherService.getById(req.params._id)
        .then(publisher => { res.send({ success: true, publisher }) })
        .catch(res.onError);
})

routerPublisher.post('/', (req, res) => {
    PublisherService.createPublisher(req.body)
        .then(publisher => { res.send({ success: true, publisher }) })
        .catch(res.onError);
});

routerPublisher.put('/:_id', (req, res) => {
    PublisherService.updatePublisher(req.params._id, req.body)
        .then(publisher => { res.send({ success: true, publisher }) })
        .catch(res.onError)
});

routerPublisher.delete('/:_id', (req, res) => {
    PublisherService.removePublisher(req.params._id)
        .then(publisher => { res.send({ success: true, publisher }) })
        .catch(res.onError)
});

module.exports = { routerPublisher };