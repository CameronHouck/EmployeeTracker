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

            case 'View Departments':
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

const viewRole = () => {
    connection.query('SELECT * FROM Emp_Role', (err, res) => {
        if (err) throw err;
    res.forEach(({ID, title, salary, dept_id }) => {
        console.log(`${ID} | ${title} | ${salary} | ${dept_id}`);
    });
    console.log('---------------------');
    start();
});
}

const viewEmp = async () => {
    const emp_Table = await query(
        `SELECT e.id AS 'Employee ID',
        e.first_name AS 'First Name',
        e.last_name AS 'Last Name',
        department.dept_name AS 'Department',
        Emp_role.title AS 'Title',
    CONCAT(m.first_name, ' ', m.last_name) 
        AS Manager FROM 
        employee_trackerdb.employee AS e 
    INNER JOIN
        Emp_role ON (e.role_id = emp_role.ID)
    INNER JOIN
        department ON (emp_role.dept_id = department.ID)
    LEFT JOIN
        employee_trackerDB.employee m ON e.manager_id = m.id
    ORDER BY
        department.dept_name;`
    );
    console.table(emp_Table);
        start();
    };

    const addEmp = () => {
        inquirer
        .prompt([
            {
            name: "firstName",
            type: "input",
            message: "Enter new Employee's first name", 
            },
            {
            name: "lastName",
            type: "input",
            message: "Enter new Employee's last name",
            },
            {
            name: "roleId",
            type: "input",
            message: "What is the ID for this employees current role?"
            },
            {
                name: "managerId",
                type: "input",
                message: "What is the ID for this employees manager?"
            }
        ])
        .then((answer) => {
    
            connection.query(
                'INSERT INTO employee SET ?',
                {
                    
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.roleId,
                    manager_id: answer.managerId,
                },
                (err) => {
                    if (err) throw err;
                    console.log('New employee added!');
                    start();
                }
            );
        });
    };

    const addRole = () => {
        inquirer
        .prompt([
            {
            name: 'title',
            type: 'input',
            message: 'Please enter the title of the new Role', 
            },
            {
            name: 'salary',
            type: 'input',
            message: 'What is the salary for this role?',
            },
            {
            name: 'dept_id',
            type: 'input',
            message: 'What is the department ID for this role?'
            }
        ])
        .then((answer) => {
            connection.query(
                'INSERT INTO Emp_role SET ?',
                {
                    title: answer.title,
                    salary: answer.salary,
                    dept_id: answer.dept_id
                },
                (err) => {
                    if (err) throw err;
                    console.log('New role added!');
                    start();
                }
            );
        });
    };

    const update = () => {
        inquirer.prompt([
            {
                name: 'employee',
                type: 'list',
                message: 'Which Employee would you like to update?',
                choices: () => listEmployees(),
            },
            {
                name: 'newTitle',
                type: 'list',
                message: 'What is this employees new role?',
                choices: () => roleList(),
            },
        ])
        
        .then(async function (res) {
            const empArray = res.employee.split(" ");
            const empFirst = empArray[0];
            const empLast = empArray[1];
            const newRole = res.newTitle;
 
            const updatedRole = await query('SELECT ID FROM emp_role WHERE ?', {
                title: newRole, 
            });
         
         const empID = await query(
             'SELECT ID FROM employee WHERE ? AND ?',
             [{ first_name: empFirst}, {last_name: empLast }]
         );
 
         await query('UPDATE employee SET ? WHERE ?', [
             {
                 role_id: updatedRole[0].ID,
             },
             {
                 id: empID[0].ID,
             },
         ]);
 
         console.log('Role updated!');
         start();
     });
 };



