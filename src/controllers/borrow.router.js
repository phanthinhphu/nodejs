const { Router } = require('express');
const routerBorrow = Router();
const { BorrowService } = require('../services/borrow.service');

// routerBorrow.get('/', (req, res) => {

// });

module.exports = { routerBorrow };