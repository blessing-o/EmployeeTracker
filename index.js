// const fs = require ('fs');
const mysql = require('mysql2');
const inquirer = require ('inquirer');

function viewAllDepartments(){
    const sql = 'SELECT * FROM department';
    db.query(sql,(err, rows)=>{
        if(err) throw err;
        console.log(rows);
    })
}

function viewAllRoles(){
    const sql = 'SELECT * FROM role';
    db.query(sql,(err, rows)=>{
        if(err) throw err;
        console.log(rows);
    })
}

// function addAdepartment(){
//     inquirer
//         .prompt([
//             {input: "list",
//             message: "what's the name of the department you want to add?",
//             name: "department",
//             },
//         ])
//         .then((dep)=>{
//             action(choice); 
//         })

// }

function action(choice) {
    switch (choice.choice) {
      case 'view all departments':
        viewAllDepartments();
        break;
      case 'view all roles':
        viewAllRoles()
        break;
      case 'view all employees':
        // Implement logic to view all employees
        break;
      case 'add a department':
        // Implement logic to add a department
        break;
      case 'add a role':
        // Implement logic to add a role
        break;
      case 'add an employee':
        // Implement logic to add an employee
        break;
      case 'update an employee role':
        // Implement logic to update an employee role
        break;
      default:
        console.log('Invalid choice. Please choose a valid option.');
    }
  }

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: '',
      database: 'employer_db'
    },
    console.log(`Connected to the employer_db database.`)
  );

function init(){
    inquirer
        .prompt([
            {type: "list",
            message: "Select one of the following options",
            name: "choice",
            choices: ["view all departments", "view all roles","view all employees","add a department", "add a role", "add an employee", "update an employee role"]
            },
        ])
        .then((choice)=>{
            action(choice); 
        })
}

init();