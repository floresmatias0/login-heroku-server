const server = require('express').Router();
const { User } = require('../../db.js');
const passport = require('../../../middleware/passport.middleware');

server.post('/', async (req, res) => { 
    const {name,surname,email,password} = req.body

    return await User.findOrCreate({
        where:{
            email:email
        },
        defaults:{
            name:name,
            surname:surname,
            password:password 
        }
    })
    .then(user => {
        res.status(200).json(user);
    }) 
    .catch(error => {
        res.status(400).send(error)
    })
});

server.post('/login', passport.authenticate('local'),
    function(req, res) {
        let cookies = {
            cookie: req.session.cookie,
            user: req.user
        }
        res.status(200).json(cookies)
});

server.post('/logout', (req, res) => {
    req.session.destroy();    
    res.status(200).clearCookie('sid', {
      path: '/'
    });
});


module.exports = server;