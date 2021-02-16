const mysql2 = require('mysql2')
const config = require('../config/config.js')

const pool = mysql2.createPool(config).promise();

module.exports = pool