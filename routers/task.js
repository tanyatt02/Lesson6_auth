const express = require('express');
const controllers = require('../controllers')
const options = require('../controllers/options.js')
const cookieParser = require('cookie-parser')

const router = express.Router();

router.get('/', (req, res) => {
    console.log('session = ', req.session)
    if (!req.session.username) {
        res.redirect('/auth/login/')
    } else {
        console.log('cookie = ', req.cookies)
        if (req.cookies.name) {

            options.name = req.cookies.name
        }
        options.begin = true
        options.list = false

        console.log('options = ', options)
        res.render('form', options)
    }
})

router.post('/create', async (req, res) => {
    if (!req.cookies || !req.cookies.name || req.cookies.name != req.body.name) {
        res.cookie('name', req.body.name)
    }
    controllers.task.create(req, res)

})

router.post('/insert', async (req, res) => {


    controllers.task.insert(req, res)

})

router.post('/delete', async (req, res) => {


    controllers.task.delete(req, res)

})

router.post('/update', async (req, res) => {

    controllers.task.update(req, res)
})


module.exports = router;
