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

const query = util.promisify(connection.query).bind(connection);

const start = () => {
    inquirer.prompt({
        name: 'Options',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'Add Department',
            'Add Employee', 
            'Add Role',
            'View Departments',
            'View Roles', 
            'View Employees',
            'Update An Employee Role',
            'Cancel',
        ],
    })
.then((answer) => {
        switch (answer.Options) {
            case 'Add Department':
            addDept();
            break;
        
            case 'Add Employee':
            addRole();
            break;
            
            case 'Add Role':
            addEmp();
            break; 

            case 'View Department':
            viewDept();
            break;

            case 'View Roles':
            viewRole();
            break;
            
            case 'View Employees':
            viewEmp();
            break;

            case 'Update An Employee Role':
            update();
            break;

            case 'Cancel':
                connection.end();
            break;
        }
    });
};

const viewDept = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
    res.forEach(({ID, dept_name}) => {
        console.log(`${ID} | ${dept_name}`);
    });
    console.log('---------------------');
    start();
});
}




