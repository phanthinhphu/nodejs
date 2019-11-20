const { Router } = require('express');
const routerUser = Router({ mergeParams: true });
const { UserService } = require('../services/user.service');

routerUser.get('/', (req, res) => {
    UserService.getAll()
        .then(users => { res.send({ success: true, users }) })
        .catch(res.onError);
});

routerUser.get('/checktoken', (req, res) => {

    UserService.checkToken(req.headers.token)
        .then(user => res.send({ success: true, user }))
        .catch(res.onError)
});

routerUser.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserService.login(email, password)
        .then(user => { res.send({ success: true, user }) })
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

routerUser.get('/:_id', (req, res) => {
    UserService.getById(req.params._id)
        .then(user => { res.send({ success: true, user }) })
        .catch(res.onError)
})

module.exports = { routerUser };