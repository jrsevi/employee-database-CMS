const inquirer = require('inquirer');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Birdman44!',
    database: 'employee_db'
});

function getEmployees() {
 const query= `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
 FROM employee
 INNER JOIN role ON employee.role_id = role.id
 INNER JOIN department ON role.department_id = department.id
 LEFT JOIN employee manager ON employee.manager_id = manager.id`;

 db.query(query, function(err, res) {
    if (err) {
        console.log(err);
        init();
    } else {
        console.table(res);
        init();
    }
    });


}
