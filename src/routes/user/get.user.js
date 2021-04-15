const server = require('express').Router();
const { User } = require('../../db.js');


server.get('/', async (req, res, next) => { 
    return await User.findAll()
    .then(users => {
        res.status(200).json(users);
    }) 
    .catch(error => {
        res.status(400).send(error)
    })
});

server.get('/:userId', async (req,res,next) => {

    const {userId} = req.params

    return await User.findOne({
        where:{
            id: userId
        }
    }).then(user => {
        res.status(200).json(user)
    }).catch(err =>{
        res.status(400).send(err)
    })
})

module.exports = server;