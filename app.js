var mysql = require("mysql");
var mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
var figlet = require("figlet");

figlet("EMPLOYEE  \n       MANAGER!", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Brody205!",
  database: "employeetracker_db",
});

connection.connect(function (err) {
  if (err) throw err;
  initialize();
});

function initialize() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",

        "View All Roles",
        "Add Role",
        "Remove Role",

        "View All Departments",
        "Add Department",
        "Remove Department",
        "Exit",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View All Employees":
          viewEmployees();
          break;
        case "View All Departments":
          viewDepartments();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Remove Employee":
          removeEmployee();
          break;
        case "Remove Department":
          removeDepartment();
          break;
        case "Remove Role":
          removeRole();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
}

function viewEmployees() {
  var query =
    "SELECT a.employee_id AS 'employee ID', a.first_name,a.last_name, role.role_type, department.department, role.salary,concat(b.first_name, ' ',b.last.name) as 'Manager Name' FROM employee a LEFT OUTER JOIN employee b ON a.manager_id = b.employee_id INNER JOIN role ON (role.role_id = a.role_id) INNER JOIN department ON (departemt.department_id = role.department_id);";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    initialize();
  });
}

function viewDepartments() {
  connection.query("SELECT * FROM department;", function (err, res) {
    if (err) throw err;
    console.table(res);
    inititalize();
  });
}

function viewRoles() {
  connection.query("SELECT * FROM role;", function (err, res) {
    if (err) throw err;
    console.table(res);
    initialize();
  });
}

function removeEmployee() {
  connection.query("SELECT * FROM employee;", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rowlist",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
              choiceArray.push(res[i].first_name);
            }
            return choiceArray;
          },
          message: "Which Employee do you want to remove?",
        },
      ])
      .then(function (answer) {
        connection.query(
          "DELETE FROM employee WHERE first_name = ?",
          [answer.choice],
          function (err) {
            if (err) throw err;
            console.log("Employee removed successfully");
            initialize();
          }
        );
      });
  });
}
