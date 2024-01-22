// const fs = require ('fs');
const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");

function viewAllDepartments() {
  const sql = "SELECT * FROM department";
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    init();
  });
}

function viewAllRoles() {
  // WHEN I choose to view all roles
  // THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
  const sql =
    "SELECT role.title, role.id, department.name  departmentName, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;";
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    init();
  });
}



function viewEmployees() {
  const sql = " SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS job_title, department.name AS department_name, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name  FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id;"
  ;

  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    init();
  });
}

function updateEmployeeRole() {
  const sql = "SELECT id, first_name, last_name FROM employee";
  db.query(sql, (err, rows) => {
    if (err) throw err;

    const employees = rows.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    const sqlRole = "SELECT id, title FROM role";
    db.query(sqlRole, (err, rows) => {
      if (err) throw err;

      const roles = rows.map(({ id, title }) => ({
        name: title,
        value: id,
      }));

      inquirer
        .prompt([
          {
            type: "list",
            message: "Select the employee to update:",
            name: "employee_id",
            choices: employees,
          },
          {
            type: "list",
            message: "Select the new role for the employee:",
            name: "role_id",
            choices: roles,
          },
        ])
        .then((answers) => {
          const sql =
            "UPDATE employee SET role_id = ? WHERE id = ?";
          db.query(sql, [answers.role_id, answers.employee_id], (err, rows) => {
            if (err) throw err;
            console.log("Employee role updated successfully!");
            init();
          });
        });
    });
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        input: "input",
        message: "what's the name of the department you want to add?",
        name: "departmentName",
      },
    ])
    .then((dep) => {
      const sql = "INSERT INTO department(name) VALUES(?)";
      db.query(sql, dep.departmentName, (err, rows) => {
        if (err) throw err;
        console.log("successfully added to department");
      });
    });
}

function addRole() {

    const sql = "SELECT * FROM department";
    db.query(sql, (err, rows) => {
      if (err) throw err;

      const departments = rows.map(({id, name})=> ({
        name: name, 
        value: id
      }))
      
      
      inquirer
        .prompt([
          {
            type: "input",
            message: "what's the name of the role you want to add?",
            name: "roleName",
          },
          {
            type: "input",
            message: "what is the salary for this role?",
            name: "salary",
          },
          {
            type: "list",
            message: "what department is this role in?",
            name: "departmentName",
            choices: departments
            
          },
        ])     
        .then((role) => {
         
    
            const sql =
              "INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)";
            db.query(sql, [role.roleName, role.salary, role.departmentName], (err, rows) => {
              if (err) throw err;
              console.log("Successfully added to role");
              init()
            });
          
        });
    });
}

function action(a) {
  switch (a.choice) {
    case "view all departments":
      viewAllDepartments();
      break;
    case "view all roles":
      viewAllRoles();
      break;
    case "view all employees":
      viewEmployees();
      break;
    case "add a department":
      addDepartment();
      break;
    case "add a role":
      addRole();
      break;
    case "add an employee":
      addEmployee();
      break;
    case "update an employee role":
      updateEmployeeRole();
      break;
    default:
      console.log("Invalid choice. Please choose a valid option.");
  }
}

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password here
    password: "",
    database: "employer_db",
  },
  console.log(`Connected to the employer_db database.`)
);

function init() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Select one of the following options",
        name: "choice",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
        ],
      },
    ])
    .then((choice) => {
      action(choice);
    });
}

init();
