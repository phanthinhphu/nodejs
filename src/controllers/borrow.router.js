const { Router } = require('express');
const routerBorrow = Router({ mergeParams: true });
const { BorrowService } = require('../services/borrow.service');

routerBorrow.get('/', (req, res) => {
    BorrowService.getAll()
        .then(borrows => res.send({ success: true, borrows }))
        .catch(res.onError)
});

routerBorrow.get('/getcards', (req, res) => {
    BorrowService.getCards()
        .then(card => res.send({ success: true, card }))
        .catch(res.onError)
})

routerBorrow.get('/getbooks', (req, res) => {
    BorrowService.getBooks(req.query.id)
        .then(books => res.send({ success: true, books }))
        .catch(res.onError)
})

routerBorrow.post('/', (req, res) => {
    BorrowService.createBorrow(req.body)
        .then(borrow => res.send({ success: true, borrow }))
        .catch(res.onError)
})

routerBorrow.get('/:_id', (req, res) => {
    BorrowService.getById(req.params._id)
        .then(borrow => res.send({ success: true, borrow }))
        .catch(res.onError)
})

routerBorrow.put('/:_id', (req, res) => {
    BorrowService.updateBorrow(req.params._id,req.body)
        .then(borrow => res.send({ success: true, borrow }))
        .catch(res.onError)
})

module.exports = { routerBorrow };