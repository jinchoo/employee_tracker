//To access a MySQL and MYSQL2 database with Node.js, need a My SQL driver.  After downloading and installing from NPM, Node.js can use this module to manipulate the MySQL and MySQL2 database.
var mysql = require("mysql");
var mysql = require("mysql2");
//Inquirer is a promise-based npm package used i NOde projects to create CLI tools for query-based tasks.  For example, asking user questions, validiating user inputs, and doing stuff with the responses given.
const inquirer = require("inquirer");
//console.table to print MYSQL rows to the console.
const cTable = require("console.table");
//figlet covert text into ASCII art-drawings made out of text characters.
var figlet = require("figlet");
//figlet convert "EMPOLYEE MANAGER" text into ASCII art-drawings.
//If an error occured, it will returned by the first err argument.  If no error occurred, err will be set to null and any succssful data will be returend in the second argument.
figlet("EMPLOYEE  \n       MANAGER!", function (err, data) {
  //If the error happens, the error message will priint "Something went wrong...";
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    //If there are no errors, "EMPLOYEE MANAGER" will execute.
    return;
  }
  //use console.log to print data so that it is easy to debug when issue occurs and alos helps on undestand the data flow.
  console.log(data);
});
//The node-mysql package enables you to easily connect to a MySQL database using Node.js.
var connection = mysql.createConnection({
  //localhost is a hostname that refers to the current computer used to access it.
  //It isused to access the network services that are running on the host via the loopback network interface.
  host: "localhost",
  //Port 3306 is the defalut port for the classic MySQL protocal(port), which is used by the mySQL client.
  port: 3306,
  user: "root",
  password: "Brody205!",
  //Name of the database in the MySQL.
  database: "employeetracker_db",
});

//call the connect() method on the connection object to connect to the MySQL database server.
//The connect() method accepts a callback function that has the err argument which provides the detailed error if any error occured.
connection.connect(function (err) {
  if (err) throw err;
  //The initalize() method ensures that all remaining quries are always executed before the database connection initialize.
  initialize();
});

//initializing the series of questions
function initialize() {
  //method takes in an array of objects where each question object is asked in sequential order.
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
    //Inquirer was designed to return the answers to its input message in a call back function.
    //The answer parameter is passed into our .then promise.  You can answer parameter to perform actions inside the prmise function.
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
  //  var query = "SELECT employee.employee_id,employee.first_name,employee.last_name,role.role_type,department.department,role.salary,employee.manager_id FROM employee INNER JOIN role ON (role.role_id = employee.role_id) INNER JOIN department ON (department.department_id = role.department_id);";
  var query =
    "SELECT a.employee_id AS 'employee ID',a.first_name,a.last_name,role.role_type,department.department,role.salary,concat(b.first_name, ' ',b.last_name) as 'Manager Name' FROM employee a LEFT OUTER JOIN employee b ON a.manager_id = b.employee_id INNER JOIN role ON (role.role_id = a.role_id) INNER JOIN department ON (department.department_id = role.department_id);";
  //change to adding department based on manager id details later
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
    initialize();
  });
}

function viewRoles() {
  connection.query("SELECT * FROM role;", function (err, res) {
    if (err) throw err;
    console.table(res);
    initialize();
  });
}

//remove data
function removeEmployee() {
  connection.query("SELECT * FROM employee;", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
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

function removeDepartment() {
  connection.query("SELECT department FROM department;", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
              choiceArray.push(res[i].department);
            }
            return choiceArray;
          },
          message: "What department would you like to remove?",
        },
      ])
      .then(function (answer) {
        connection.query(
          "DELETE FROM department WHERE department = ?",
          [answer.choice],
          function (err) {
            if (err) throw err;
            console.log("Departments deleted successfully");
            initialize();
          }
        );
      });
  });
}

function removeRole() {
  connection.query("SELECT * FROM role;", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
              choiceArray.push(res[i].role_type);
            }
            return choiceArray;
          },
          message: "Which Employee do you want to remove?",
        },
      ])
      .then(function (answer) {
        connection.query(
          "DELETE FROM role WHERE role_type = ?",
          [answer.choice],
          function (err) {
            if (err) throw err;
            console.log("Role removed successfully");
            initialize();
          }
        );
      });
  });
}

//add data
function addEmployee() {
  connection.query(
    "SELECT role.role_type,role.role_id,department.department,department.department_id  FROM role INNER JOIN department ON (department.department_id = role.department_id);",
    function (err, res) {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "first_name",
            type: "input",
            message: "What is Employee's first name?",
          },
          {
            name: "last_name",
            type: "input",
            message: "What is Employee's last name?",
          },
          {
            name: "role",
            type: "rawlist",
            message: "What is employee's role?",
            choices: function () {
              var choiceArray = [];
              for (var i = 0; i < res.length; i++) {
                choiceArray.push(res[i].role_type);
              }
              return choiceArray;
            },
          },
          {
            name: "manager_id",
            type: "input",
            message: "What is Employee's Manager's id?",
            //change to adding manager later
          },
        ])
        .then(function (answer) {
          var role_id;
          for (var i = 0; i < res.length; i++) {
            if (res[i].role_type === answer.role) {
              role_id = res[i].role_id;
            }
          }
          connection.query(
            "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?) ",
            [answer.first_name, answer.last_name, role_id, answer.manager_id],
            function (err) {
              if (err) throw err;
              console.log("Added employee to database successfully");
              initialize();
            }
          );
        });
    }
  );
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "dep_name",
        type: "input",
        message: "What is the new Department name?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO department (department) VALUES (?) ",
        [answer.dep_name],
        function (err) {
          if (err) throw err;
          console.log("Added department to database successfully");
          initialize();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        name: "role_type",
        type: "input",
        message: "What is the new Role?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the Expected Salary?",
      },
      {
        name: "department",
        type: "input",
        message: "What is the new department?",
        //change to adding department based on role later
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO role(role_type, salary, department_id) VALUES (?,?,?) ",
        [answer.role_type, answer.salary, answer.department],
        function (err) {
          if (err) throw err;
          console.log("Added role to database successfully");
          initialize();
        }
      );
    });
}

//update data
function updateEmployeeRole() {
  connection.query(
    "SELECT e.employee_id,e.first_name,r.role_type,r.role_id,e.role_id FROM employee AS e INNER JOIN role AS r ON (r.role_id = e.role_id);",
    function (err, res) {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "choice",
            type: "rawlist",
            choices: function () {
              var choiceArray = [];
              for (var i = 0; i < res.length; i++) {
                choiceArray.push(res[i].first_name);
              }
              return choiceArray;
            },
            message: "Which Employee's role do you want to update?",
          },
        ])
        .then(function (answer) {
          var role_id;
          for (var i = 0; i < res.length; i++) {
            if (res[i].first_name === answer.choice) {
              role_id = res[i].role_id;
              connection.query(
                "SELECT role_type,role_id FROM role",
                function (err, roles) {
                  if (err) throw err;
                  inquirer
                    .prompt([
                      {
                        name: "role_type",
                        type: "rawlist",
                        choices: function () {
                          var choiceArray = [];
                          for (var i = 0; i < roles.length; i++) {
                            choiceArray.push(roles[i].role_type);
                          }
                          return choiceArray;
                        },
                        message: "Select the Role you want to assign",
                      },
                    ])
                    .then(function (subanswer) {
                      if (roles[i].role_type === subanswer.role_type) {
                        role_id = roles[i].role_id;
                        connection.query(
                          "UPDATE employee SET role_id=? WHERE first_name = ?",
                          [role_id, answer.choice],
                          function (err) {
                            if (err) throw err;
                            console.log(
                              "Role updated successfully for employee"
                            );
                            initialize();
                          }
                        );
                      }
                    });
                }
              );
            }
          }
        });
    }
  );
}
