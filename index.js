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
const sessionStore = new (require('express-mysql-session')(session))({}, db);
const sessionMiddleware = session({
  store: sessionStore,
  secret: "Большой секрет",
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: { maxAge: 600000 }
});

app.use(sessionMiddleware);

const middlewares = require('./middlewares');
app.use(middlewares.logSession);

//const handlebars = require('handlebars');
const hbs = require('hbs')


//app.engine('hbs', handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');


//const pool = mysql2.createPool(config).promise();

let options = {
    name: '',
    begin: true,
    list: false,
    update: false,
    todo: [],


}

let todoItem = {
    done: false,
    title: ''
}

async function findId(num) {
    let todo = await task.list(options.name)
    if (num <= todo.length) {
        id = todo[num - 1].id
    }
    return id
}

const router = require('./routers');

app.use(router);

router.use('/', controllers.main.indexPage);

app.get('/task', (req, res) => {
    console.log('cookie = ', req.cookies)
    if (req.cookies.name) {

        options.name = req.cookies.name
    }
    options.begin = true
    options.list = false

    console.log('options = ', options)
    res.render('form', options)
})

app.post('/create', async (req, res) => {
    if (!req.cookies || !req.cookies.name || req.cookies.name != req.body.name) {
        res.cookie('name', req.body.name)
    }
    controllers.task.create(req,res)

})

app.post('/insert', async (req, res) => {

    
    controllers.task.insert(req,res)

})

app.post('/delete', async (req, res) => {


    controllers.task.delete(req,res)

})

app.post('/update', async (req, res) => {

    controllers.task.update(req,res)
})


app.get('/cache', (req, res) => {
    console.log(Object.entries(cache));
    res.render('cache', cache);
});




app.listen(3000, () => console.log('Listening on port 3000'));
