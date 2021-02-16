//const mysql=require('mysql2')

//const mysql = require("mysql2");

//const connection = mysql.createConnection({
//  host: "localhost",
//  user: "root",
//  database: "TODOdb",
//  password: "mIsha_2602"
//});
// connection.connect(function(err){
//    if (err) {
//      return console.error("Ошибка: " + err.message);
//    }
//    else{
//      console.log("Подключение к серверу MySQL успешно установлено");
//    }
// });

//connection.query("CREATE DATABASE TODOdb",
//  function(err, results) {
//    if(err) console.log(err);
//    else console.log("База данных создана");
//});
 
const connection = require('./db.js')

async function   create(name) {
        let sql = `create table if not exists ` + name + `(
  id int primary key auto_increment,
  title varchar(45) not null,
  done boolean not null
    )`;
  let result = await connection.query(sql);
  return result
//    sql=`INSERT INTO ` + name + `(title, done) VALUES('FREE NAVALNY', false)`
//   res =await connection.query(sql);
//        
//    sql = `SELECT * FROM `+name  
//   res = await connection.query(sql);
//    console.log(res)
    }


module.exports = create
//const sql = `create table if not exists ttt(
//  id int primary key auto_increment,
//  title varchar(45) not null,
//  done boolean not null
//)`;
// 
//connection.query(sql, function(err, results) {
//    if(err) console.log(err);
//    else console.log("Таблица создана");
//});

//const sql = `INSERT INTO ttt(title, done) VALUES('FREE NAVALNY', false)`;
// 
//connection.query(sql, function(err, results) {
//    if(err) console.log(err);
//    console.log(results);
//});

//const sql = `SELECT * FROM ttt`;
// 
//connection.query(sql, function(err, results) {
//    if(err) console.log(err);
//    console.log(results);
//});


// закрытие подключения
// connection.end(function(err) {
//  if (err) {
//    return console.log("Ошибка: " + err.message);
//  }
//  console.log("Подключение закрыто");
//});
