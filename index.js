// const fs = require ('fs');
const mysql = require('mysql2');
const inquirer = require ('inquirer');

function action(s){

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