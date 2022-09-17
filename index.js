// Required libraries
const inquirer = require("inquirer");
const fs = require("fs");

// Import classes
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// Setting up the bulk html to fill in
const htmlHeader = 
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employees</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <header class="p-5 bg-danger text-white rounded text-center">
        <h1>Team Members</h1>
    </header>
    <main class="row">\n`;
const htmlFooter =
`    </main>
    
</body>
</html>`;

let body = ``;

// Main function called on init
const doPrompts = () => {
    // Create Prompts
    // Using when inside to determine which questions to ask depending on employee type
    inquirer.prompt([
        {
            type: "list",
            name: "employeeType",
            message: "What type of employee",
            choices: ["Manager", "Engineer", "Intern"]
        },
        {
            type: "input",
            name: "name",
            message: "Enter name of employee"
        },
        {
            type: "number",
            name: "id",
            message: "Enter id for employee"
        },
        {
            type: "input",
            name: "email",
            message: "Enter email for employee"
        },
        {
            type: "number",
            name: "officeNumber",
            message: "Enter office number",
            when(answers) {
                return answers.employeeType === "Manager";
            }
        },
        {
            type: "input",
            name: "github",
            message: "Enter Github Username",
            when(answers) {
                return answers.employeeType === "Engineer";
            }
        },
        {
            type: "input",
            name: "school",
            message: "Enter school name",
            when(answers) {
                return answers.employeeType === "Intern";
            }
        }
    ]).then((answer) => {
        const { name, id, email, employeeType } = answer;
        let employee;
        // Create the employee depending on type
        switch(employeeType){
            case "Manager":
                employee = new Manager(name, id, email, answer.officeNumber);
                break;
            case "Engineer":
                employee = new Engineer(name, id, email, answer.github);
                break;
            case "Intern":
                employee = new Intern(name, id, email, answer.school);
                break;
        }
        // Do createHTML function to add this person to our body
        createHTML(employee);
        // See if more people are to be added
        nextPersonPrompt();
    });
}

// Called to check if there are more employees then recalls do prompts if there are more
const nextPersonPrompt = () => {
    inquirer.prompt([
        {
            type: "confirm",
            name: "continue",
            message: "Are there more employees?"
        }
    ]).then((answer) => {
        if (answer.continue) {
            doPrompts();
        } else {
            makeFile();
        }
    });
}

// Adds the card to the body that we initialized above
const createHTML = (employee) => {
    let row2 = `Email: <a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a>`
    let row3;
    // Switch statement to determine what should go on the last line of the card
    switch(employee.getRole()){
        case "Manager":
            row3 = `Office Number: ${employee.getOfficeNumber()}`;
            break;
        case "Engineer":
            row3 = `Github: <a href="https://github.com/${employee.getGithub()}">${employee.getGithub()}</a>`;
            break;
        case "Intern":
            row3 = `School: ${employee.getSchool()}`;
            break;
    }
    // Actual addition to the body string
    body += createCard(employee.getName(), employee.getRole(), "ID: " + employee.getId(), row2, row3);
}

// Returns an idividual card
const createCard = (name, role, row1, row2, row3) => {
    let card = 
`<div class="card text-white col-4">
    <div class="card-header bg-primary">
        <h2 class="card-title">${name}</h1>
        <p class="card-text">${role}</p>
    </div>
    <div class="card-body container text-black">
        <p class="card-footer">${row1}</p>
        <p class="card-footer">${row2}</p>
        <p class="card-footer">${row3}</p>
    </div>
</div>\n`;
    return card; 
}

// Creation of the file
const makeFile = () => {
    const output = htmlHeader + body + htmlFooter;
    fs.writeFile("./dist/index.html", output, (error) => 
    error ? console.error(error) : console.log("sucess"));
}


// Call init function
doPrompts();