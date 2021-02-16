const options = require('../controllers/options.js')
const task = require('../models/task')
module.exports =
    async function findId(num) {
    let id
        let todo = await task.list(options.name)
        if (num <= todo.length) {
            id = todo[num - 1].id
        }
        
        return id
    }
