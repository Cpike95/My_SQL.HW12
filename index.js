const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Brownie#2013",
  database: "employeeDB"
});

connection.connect((err => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
}));
// prompt the user to make a slection of what they would like to do.
// then based on there selection it will call the appropriate function.  
start();
function start() {
    inquirer
        .prompt ({
            type: "list",
            name: "start",
            message: "What would you like to do?",
            choices: [
                "Add a new department.",
                "Add a new role.",
                "Add a new employee.",
                "View a department.",
                "View roles.",
                "View an employee.",
                "Update an employees role.",
                "Update an employees managers",
                "View employees by manager.",
                "Delete department",
                "Delete roles",
                "Delete employee"
            ]
        })
        .then(data => {
        //switch and case statements to be called based on the selection
        // //that the user makes. 
         if (data.start === "Add a new department.") {
            addDepartment();
         } else if (data.start === "Add a new role." ) {
            addRole();
         }

        });
}
// sql will set add the department to the department table where it will have an id
//prompts the user for the department name then adds the department to the department 
function addDepartment() {
    inquirer
        .prompt ([
            {
            type: "input",
            message: "Department name:",
            name: "department"
            }
        ])
        .then(data => {
            const sql = `INSERT INTO department(name) VALUES(?) `;
            const depart = data.department;
            connection.query(sql, depart, (err, res) => {
                if (err) throw err;
                console.log("1 department inserted");
                console.table(res);
            });
            start();
        });
        
};

// prompts user to input the role title and there salary and what department they are in.
// sql uses the role table to create a new row
//asks for employees manager and attaches the
//sql joins this role to the matching id selected from the departments list. 
function addRole() {
    inquirer
        .prompt ([
            {
                type: "input",
                message: "What type of role would you like to create?",
                name: "role"
            },
            {
                type: "input",
                message: "What is the salary for this role?",
                name: "salary"
            },
            {
                type: "input",
                message: "what department do they belong to?",
                name: "department"
            }
        ])
        .then(data => {
            // add this data to the roles table jpined 
            // const sql = `INSERT INTO role(name, title, salary) VALUES(?) `;
            // connection.query(sql, data.role, data.salaray, data.department, (err, res) => {
            //     if (err) throw err;
                console.log(`Manager was added to ${data.department}.`);
                console.table(data);
            })
            start();
        // })
};
//prompts user for the employees first and last name
//sql searches for the matchin
// function addEmployee() {
//     inquirer
//         .prompt ({
//             type: "input",


//         })
//         .then(data => {

//         })
// };
// function addRole() {
//     inquirer
//         .prompt ([
//             {
//                 type: "input",
//                 message: "What is there role?",
//                 name: "role"
//             },
//             {
//                 type: "input",
//                 message: "What department are they in??",
//                 name: "department"
//             },
//         ])
//         .then(data => {
//             // add the id for that department to the role which will add the role to the department

//         })
// };

//Create an array lists from the current sql db tables
//user must select a department from the department list 
// function viewDepartment() {
//     const department = [];
//     connection.query("SELECT name FROM department ", (err, res) => {
//       if (err) throw err;
//       for (let i = 0; i < res.length; i++) {
//         department.push(res[i].name);
//         if (res === 0){
//             console.log(`No departments listed.`);
//         }
//       }
//       inquirer
//         .prompt({
//             name: "role",
//             type: "list",
//             message: "Which department would you like to view?",
//             choices: department
//       }).then(data => {
//           // display the department list from the table
//           var query = "SELECT department ";
//           query += "FROM role INNER JOIN employeeDB ON (department.id = top5000.artist AND top_albums.year ";
//           query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";
    
//           connection.query(query, [data.name, data.role, data.employee], function(err, res) {
//             console.table(res.length);
//             });
//         })
//     })
// }
//Create a list of employees by going into the employee table and pulling from there/ 
// function viewEmployee() {
//     const name = [];
//     connection.query("SELECT name FROM department ", (err, res) => {
//       if (err) throw err;
//       for (let i = 0; i < res.length; i++) {
//         name.push(res[i].name);
//         if (res === 0){
//             console.log(`No employees listed.`);
//         }
//       }
//       inquirer
//         .prompt({
//                 name: "role",
//                 type: "list",
//                 message: "select the employees",
//                 choices: name
//         }).then(data => {

//         })
//     })
// }

// function viewRoles() {
//     const title = [];
//     connection.query("SELECT title FROM employee", (err, res) => {
//       if (err) throw err;
//       for (let i = 0; i < res.length; i++) {
//         title.push(res[i].title);
//         if (res === 0){
//             console.log(`No employees listed.`);
//         }
//       }
//       inquirer
//         .prompt({
//                 name: "role",
//                 type: "list",
//                 message: "select the employees",
//                 choices: name
//         }).then(data => {
//             //push the roles to the console table
//         })
//     })
// }

// function updateEmployee() {
//     const employee = [];
//     connection.query("SELECT title FROM employee", (err, res) => {
//       if (err) throw err;
//       for (let i = 0; i < res.length; i++) {
//         title.push(res[i].title);
//         if (res === 0){
//             console.log(`No employees listed.`);
//         }
//       }
//       inquirer
//         .prompt({
//                 name: "role",
//                 type: "list",
//                 message: "select the employees",
//                 choices: name
//         }).then(data => {
//             //push the roles to the console table
//         })
//     })
// }