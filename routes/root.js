const express = require('express');
const router = new express.Router();

router.get('/', (req, res, next) => {
    res.render('index');
})
router.get('/register', (req, res, next) => {
    res.render('register');
})
router.get('/chat', (req, res, next) => {
    if(req.session.logedin){
        console.log(req.session.name)
        return res.render('chat', {user: req.session.name});
    }else return res.redirect('/');
})
router.post('/', async(req, res, next) => {
    if(req.body.username && req.body.password){
        const user = await require('../tools/getUser')(req.body.username, req.body.password);
        console.log(user)
        if(user){
            console.log(req.session)
            req.session.name = req.body.username;
            req.session.logedin = true;
            res.redirect('/chat');
        }else return res.send("Wrong password or username or go back a create a new account!");
    }
})
router.post('/register', async(req, res, next) => {
    console.log(req.body.username, req.body.password)
    if(req.body.username && req.body.password){
        const user = await require('../tools/newUser')(req.body.username, req.body.password)
        if(user){
            req.session.name = user.username;
            req.session.logedin = true;
            res.redirect('/chat');
        }else if(!user) return res.send("This username has been exist or something went wrong! Please try again with new username!");
    }
})
module.exports = router;