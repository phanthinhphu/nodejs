const { Router } = require('express');
const { CardService } = require('../services/card.service');
const routerCard = Router({mergeParams: true});

routerCard.get('/', (req, res) => {
    CardService.getAll()
        .then(cards => { res.send({ success: true, cards }) })
        .catch(res.onError)
});

routerCard.get('/comboboxreader', (req, res) => {
    CardService.getComboboxReader()
        .then(readers => res.send({ success: true, readers }))
        .catch(res.onError)
})

routerCard.get('/:_id', (req, res) => {
    CardService.getById(req.params._id)
        .then(card => res.send({ success: true, card }))
        .catch(res.onError)
})

routerCard.post('/', (req, res) => {
    CardService.createCard(req.body)
        .then(card => { res.send({ success: true, card }) })
        .catch(res.onError)
});

routerCard.put('/:_id', (req, res) => {
    CardService.updateCard(req.params._id, req.body)
        .then(card => { res.send({ success: true, card }) })
        .catch(res.onError)
});

routerCard.delete('/:_id', (req, res) => {
    CardService.removeCard(req.params._id)
        .then(card => { res.send({ success: true, card }) })
        .catch(res.onError)
});

module.exports = { routerCard };