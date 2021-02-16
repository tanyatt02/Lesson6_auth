const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser')
//const mysql2 = require('mysql2')
const config = require('./config/config.js')
const create = require('./models/TODOcreate.js')
const task = require('./models/task')
const formatTODO = require('./formatTODO')
const controllers = require('./controllers')
const db = require('./models/db.js');


const app = express();


app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser())

const session = require('express-session');
const sessionStore = new(require('express-mysql-session')(session))({}, db);
const sessionMiddleware = session({
    store: sessionStore,
    secret: "Большой секрет",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 600000
    }
});

app.use(sessionMiddleware);

const middlewares = require('./middlewares');
app.use(middlewares.logSession);

//const handlebars = require('handlebars');
const hbs = require('hbs')


//app.engine('hbs', handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');




const router = require('./routers');

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
const googleAuth = require('./config/OAuth.js')

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(new GoogleStrategy({
        consumerKey: googleAuth.idClient,
        consumerSecret: googleAuth.secretCode,
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function (token, tokenSecret, profile, done) {
        User.findOrCreate({
            googleId: profile.id
        }, function (err, user) {
            return done(err, user);
        });
    }
));

passport.serializeUser(function(user, done){
    done(null, user)
})

passport.deserializeUser(function(username, done){
    done(null, user)
})

app.use(passport.initialize())

app.use(passport.session())

app.use(router);

router.use('/', controllers.main.indexPage);





app.listen(3000, () => console.log('Listening on port 3000'));
