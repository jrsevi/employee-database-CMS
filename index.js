const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Birdman44!',
    database: 'employee_tracker_db'
});


function viewEmployees() {
    const query = `
    SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title AS role, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
    FROM employee
    INNER JOIN role ON employee.role_id = role.id
    INNER JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id`;

    db.query(query, function (err, results) {
        if (err) {
            console.log(err);
            init();
        } else {
            console.table(results);
            init();
        }
    });
}

function viewDepartments() {
    db.query(`SELECT id, name 'department' FROM department`, function (err, results) {
        if (err) {
            console.log(err);
            init();

        } else {
            console.table(results);
            init();
        }
    });
}

function viewRoles() {
    db.query(`SELECT role.id, title 'role', salary, department.name 'department' 
    FROM role 
    JOIN department 
    ON role.department_id = department.id`, 
    function (err, results) {
        if (err) {
            console.log(err);
            init();

        } else {
            console.table(results);
            init();

        }
    });
}

function addEmployee() {
    let roleChoices = [];
    let managerChoices = [];

    db.query('SELECT * FROM role', function (err, roles) {
        if (err) {
            console.log(err);
            init();
        } else {
            roleChoices = roles.map(role => {
                return {
                    name: role.title,
                    value: role.id
                }
            });
        }

        db.query('SELECT * FROM employee', function (err, employees) {
            if (err) {
                console.log(err);
                init();
            } else {
                managerChoices = employees.map(employee => {
                    return {
                        name: employee.first_name + ' ' + employee.last_name,
                        value: employee.id
                    }
                });
            }

            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'What is the employee\'s first name?'
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'What is the employee\'s last name?'
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'What is the employee\'s role ID?',
                    choices: roleChoices
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: 'What is the employee\'s manager ID?',
                    choices: managerChoices
                }
            ]).then((answers) => {
                answers.role_id = parseInt(answers.role_id);
                answers.manager_id = parseInt(answers.manager_id);
                db.query('INSERT INTO employee SET ?', answers, function (err, results) {
                    if (err) {
                        console.log(err);
                        init();
                    } else {
                        console.log("Employee added!");
                        init();
                    }
                });
            })
        });
    });
}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the department\'s name?'
        }
    ]).then((answers) => {
        db.query('INSERT INTO department SET ?', answers, function (err, results) {
            if (err) {
                console.log(err);
                init();
            } else {
                console.log("Department added!");
                init();
            }
        });
    })
}


function addRole() {
    let departmentChoices = [];
    db.query('SELECT * FROM department', function (err, departments) {
        if (err) {
            console.log(err);
        } else {
            departmentChoices = departments.map(department => {
                return {
                    name: department.name,
                    value: department.id
                }
            });
        }
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the role\'s title?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the role\'s salary?'
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'What is the role\'s department ID?',
                choices: departmentChoices
            }
        ]).then((answers) => {
            answers.department_id = parseInt(answers.department_id);
            db.query('INSERT INTO role SET ?', answers, function (err, results) {
                if (err) {
                    console.log(err);
                    init();
                } else {
                    console.log("Role added!");
                    init();
                }
            });
        })
    });
}

function updateRole() {
    let employeeChoices = [];
    let roleChoices = [];
    db.query('SELECT * FROM employee', function (err, employees) {
        if (err) {
            console.log(err);
        } else {
            employeeChoices = employees.map(employee => {
                return {
                    name: employee.first_name + ' ' + employee.last_name,
                    value: employee.id
                }
            });
        }
        db.query('SELECT * FROM role', function (err, roles) {
            if (err) {
                console.log(err);
            } else {
                roleChoices = roles.map(role => {
                    return {
                        name: role.title,
                        value: role.id
                    }
                });
            }
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'id',
                    message: 'What is the employee\'s ID?',
                    choices: employeeChoices
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'What is the employee\'s new role ID?',
                    choices: roleChoices
                }
            ]).then((answers) => {
                db.query('UPDATE employee SET role_id = ? WHERE id = ?', [answers.role_id, answers.id], function (err, results) {
                    if (err) {
                        console.log(err);
                        init();
                    } else {
                        console.log("Employee role updated!");
                        init();
                    }
                });
            })
        });
    });
}

// RESULT: initializes the application
function init() {
    inquirer.prompt(
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'options',
            choices: ['View all employees', 'View all departments', 'View all roles', 'Add employee', 'Add department', 'Add role', 'Update employee role', 'Exit']
        },
    )
    .then((answers) => {
        switch (answers.options) {
            case 'View all employees':
                viewEmployees();
                break;
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'Add employee':
                addEmployee();
                break;
            case 'Add department':
                addDepartment();
                break;
            case 'Add role':
                addRole();
                break;
            case 'Update employee role':
                updateRole();
                break;
            case 'Exit':
                inquirer.break;
                process.exit();
                break;
        }
    })
}

init();