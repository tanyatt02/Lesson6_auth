//const mysql2=require('mysql2')
const connection = require('./db.js')
let task = {
    list: async ( name)=>{
        let sql=   `SELECT id,done,title FROM ??`;
        let s=[name]
//        sql=mysql2.format(sql, s)
        console.log('name = ', s)
        let [todo, fields] = await connection.query(sql,s);
        return todo
    },
    insert: async (todoItem)=>{
        let sql=   `INSERT DELAYED INTO    ??(done, title) VALUES(?, ?)` 
   //     sql=mysql2.format(sql, todoItem)
        let [todo, fields] = await connection.query(sql, todoItem);
        return todo
    },
    delete: async (id)=>{
        let  sql = `DELETE FROM ?? WHERE id=?`; 
        console.log('id(delete) = ', id)
      //  sql=mysql2.format(sql, id)
        let [todo, fields] = await connection.query(sql, id);
        return todo
    },
    update: async (todoItem)=>{
        let sql=   `UPDATE  ?? SET done=?, title=? WHERE id=?` 
      //  sql=mysql2.format(sql, todoItem)
        let [todo, fields] = await connection.query(sql, todoItem);
        return todo
    },
}

module.exports = task