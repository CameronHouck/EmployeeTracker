const mysql = require("mysql");
const inquirer = require ("inquirer");
const util = require ("util");
const conTable = require("console.table");

const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: '200284',

    database: 'employee_trackerDB',
});
console.log("you are connected!")

connection.connect((err) => {
    if (err) throw err;
    console.log("There was an error connecting!")
    start()
});



