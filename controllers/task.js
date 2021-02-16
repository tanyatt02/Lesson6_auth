const create = require('../models/TODOcreate.js')
const task = require('../models/task')
const formatTODO = require('../formatTODO')
const options = require('./options.js')
const findId = require('../utils/findId.js')

module.exports = {
    create: async (req, res) => {

        options.name = req.body.name;
        try {
            await create(req.body.name)
            options.begin = false
            options.list = true
        } catch (err) {
            console.log('ERROR create = ', err.message)

        }

        todo = await task.list(options.name)
        options.todo = formatTODO(todo)
        res.render('form', options)

    },
    list: async (req, res, next) => {

    },
    insert: async (req, res, next) => {
        let done = Array.isArray(req.body.done)
        let todoItem = [options.name,
        done,
        req.body.title
    ]
        try {
            await task.insert(todoItem)
        } catch (err) {
            console.log('ERROR insert = ', err.message)

        }
        console.log('options = ', options)
        todo = await task.list(options.name)
        options.todo = formatTODO(todo)
        res.render('form', options)
    },
    delete: async (req, res, next) => {
        let id = []
        id.push(options.name, await findId(req.body.num))
        try {
            await task.delete(id)
        } catch (err) {
            console.log('ERROR delete = ', err.message)
        }

        todo = await task.list(options.name)
        options.todo = formatTODO(todo)
        res.render('form', options)
    },
    update: async (req, res, next) => {
        let id = await findId(req.body.num)
        let done = Array.isArray(req.body.done)
        let todoItem = [options.name, done, req.body.title, id]
        console.log('update todoItem = ', todoItem)
        try {
            await task.update(todoItem)
        } catch (err) {
            console.log('ERROR update = ', err.message)
        }

        todo = await task.list(options.name)
        options.todo = formatTODO(todo)
        res.render('form', options)
    }
}
