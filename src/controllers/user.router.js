const { Router } = require('express');
const routerUser = Router();
const { UserService } = require('../services/user.service');

routerUser.get('/', (req, res) => {
    UserService.getAll()
        .then(users => { res.send({ success: true, users }) })
        .catch(res.onError);
});

routerUser.post('/', (req, res) => {
    UserService.createUser(req.body)
        .then(user => { res.send({ success: true, user }) })
        .catch(res.onError);
});

routerUser.put('/:_id', (req, res) => {
    UserService.updateUser(req.params._id, req.body)
        .then(user => { res.send({ success: true, user }) })
        .catch(res.onError)
});

routerUser.delete('/:_id', (req, res) => {
    UserService.removeUser(req.params._id)
        .then(user => { res.send({ success: true, user }) })
        .catch(res.onError);
});

routerUser.post('/signIn', (req, res) => {
    const { email, password } = req.body;
    UserService.signIn(email, password)
        .then(user => { res.send({ success: true, user }) })
        .catch(res.onError);
});

module.exports = { routerUser };