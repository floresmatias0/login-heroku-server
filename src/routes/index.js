const { Router } = require('express');

//Importamos los routers
const getUser = require('./user/get.user');
const postUser = require('./user/post.user');

const router = Router();

// Configuramos los routers
router.use('/users', getUser);
router.use('/users', postUser);


module.exports = router;