const fs = require ('fs');
const inquirer = require ('inquirer');

function init(){
    inquirer
        .prompt([
            {type: "list",
            message: "",
            name: "",
            choices: ["view all departments", "view all roles", ""]

            },
        ])
}