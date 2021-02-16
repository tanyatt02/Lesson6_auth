const models = require('../models');
const cookieParser = require('cookie-parser')
//const config = require('../config');

exports.getLogin = (req, res, next) => {
    let username = ''
    if (req.cookies.username) {

             username = req.cookies.username
        }
    res.render('login', {username: username});
}

exports.postLogin = (req, res, next) => {
    const user = models.User.findUserByName(req.body.username).then(([user, fieldData]) => {
        if (user.length > 0) {
            user = user[0];
            console.log('req.body.mem = ', req.body.mem);

            if (Array.isArray(req.body.mem)) {
                if (!req.cookies || !req.cookies.username || req.cookies.username != req.body.username) {
                    res.cookie('username', req.body.username)
                    console.log('auth cookie = ', res.cookies)
                }
            }

            if (models.User.checkPassword(user, req.body.password)) {
                req.session.username = req.body.username;

                res.redirect('/task/');
            } else {
                res.redirect('/auth/login/')
            }
        } else {
            res.redirect('/auth/login/');
        }
    })
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
}

exports.getSignup = (req, res, next) => {
    res.render('signup', {});
}

exports.postSignup = (req, res, next) => {
    models.User.createUser(req.body);
    res.redirect('/auth/login/');
}
