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
   
  start();
  departmentArray();
  managersArray();
  rolesArray();
//   employeesArray();

}));

const Employee = require('./employee');
const Role = require('./role');
const Department = require('./department');

//arrays that store the added data from the add functions
let departmentsArr = [];
let rolesArr =[];
let managersArr = [];
let employeesArr = [];

//Functions that create the arrays above using the data in the sql data base
function departmentArray() {

     const query = "SELECT id, department FROM department";
    
     connection.query(query, function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            departmentsArr.push( { "id": res[i].id, "department": res[i].department} );
        }
        // console.log(departmentsArr);
    });
};

function managersArray() {
    const query = "SELECT first_name, last_name FROM employee WHERE role_id Between 1 AND 5";
   
    connection.query(query, function(err, res) {
        if (err) throw err;

       for (var i = 0; i < res.length; i++) {            
           managersArr.push( {"first_name": res[i].first_name, "last_name": res[i].last_name, "role_id": res[i].role_id, "department_id": res[i].department_id } );
       }
    //    console.log(managersArr);
   })
};

function rolesArray() {
   const query = "SELECT id, title, salary FROM role";
  
   connection.query(query, function(err, res) {
    if (err) throw err;

      for (var i = 0; i < res.length; i++) {
          rolesArr.push( { "id":res[i].id, "title": res[i].title, "salary" : res[i].salary});
      }
    //   console.log(rolesArr);
  })
};

function employeesArray() {
    const query = "SELECT id, first_name, last_name, FROM role";
    
    connection.query(query, (err, res) => {
       for (let i = 0; res.length; i++) {
           if (err) throw err;
           employeesArr.push(res[i].firstname, res[i].last_name);
       }
    //    console.log(employeesArr);
   })
 };
// prompt the user to make a slection of what they would like to do.
// then based on there selection it will call the appropriate function.  
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
                "View departments.",
                "View roles.",
                "View employees.",
            ]
        })
        .then(data => {
        //switch and case statements to be called based on the selection
        // //that the user makes. 
            switch (data.start) {

                case "Add a new department.":
                    addDepartment();
                    break;
                case "Add a new role.":
                    addRole();
                    break;
                case "Add a new employee.":
                    addEmployee();
                    break;
                case "View departments.":
                    viewDepartment();
                        break;
                case "View roles.":
                    viewRoles();
                    break;
                case "View employees.":
                    viewEmployees();
                    
            }
    });   
}




// sql will set add the department to the department table where it will have an id
//prompts the user for the department name then adds the department to the department 
function addDepartment() {
    inquirer
        .prompt({
            type: "input",
            message: "Input department name:",
            name: "department"
        })
        .then(data => {

            const depart = data.department;
            const departmentId = departmentsArr.length + 1;
            const newDepartment = new Department(departmentId, depart);
            
            const sql = `INSERT INTO department(department) values(?)`;
            connection.query(sql, depart, (err, res) => {
                if (err) throw err;

                departmentsArr.push(newDepartment);
                console.log("1 department inserted");
                
                console.table(departmentsArr);

                start();
            });  
        });

};

// prompts user to input the role title and there salary and what department they are in.
// sql uses the role table to create a new row
//asks for employees manager and attaches the
//sql joins this role to the matching id selected from the departments list. 
function addRole() {
    for (let i in rolesArr) {
        i = rolesArr[i].title;
        rolesArr.push(i);
    }
    for (let i in departmentsArr) {
        i = departmentsArr[i].department;
        departmentsArr.push(i);
    }
    inquirer
        .prompt ([
            {
                type: "list",
                message: "What type of role would you like to add?",
                name: "role",
                choices: rolesArr
            },
            {
                type: "input",
                message: "What is the salary for this role?",
                name: "money",
                validate: sal => {
                    if(isNaN(sal)) {
                        return ('Please enter a number');
                    } else {
                        return true;
                    }
                }
            },
            {
                type: "list",
                message: "What department do they belong to?",
                name: "department",
                choices: departmentsArr
            }
        ])
        .then(data => {
            // add this data to the roles table jpined 
            const role = [ data.role, data.money];
            const roleId = rolesArr.length + 1;
            const newRole = new Role(data.role, data.money);

            const sql = `INSERT INTO role (title, salary) VALUES (?)  `;
            connection.query(sql, newRole, (err, res) => {
               if (err) throw err;
               
            //    if (role.endsWith('manager')) {
            //     console.log(`Manager was added to ${data.department}.`);
            //     } else {
                // } 
                    console.log("New employee added.")

                rolesArr.push(newRole)
                console.table(res);
                
                start();
            })
        })
};
//prompts user for the employees first and last name
//sql searches for the matchin
function addEmployee() {
    for (let i in rolesArr) {
        i = rolesArr[i].title;
        rolesArr.push(i);
    }
    for (let i in managersArr) {
        i = managersArr[i].first_name;
    
        managersArr.push(i);
    }
    inquirer
        .prompt ([
                 {
                    type: "input",
                    message: "What is the Employees first name?",
                    name: "firstname"
                },
                {
                    type: "input",
                    message: "What is their last name?",
                    name: "lastname"
                },
                {
                    type: "list",
                    message: "what is their role?",
                    name: "role",
                    choices: rolesArr

                },
                {
                    type: "list",
                    message: "Who is there manager?",
                    name: "manager",
                    choices: managersArr
                }

         ])
        .then(data => {
            //  add this data to the roles table jpined 

            const employee = new Employee( data.firstname, data.lastname );
            const sql = `INSERT INTO employee (first_name, last_name) VALUES ( ?)`
            
            connection.query(sql, employee, (err, res) => {
                if (err) throw err;
                const role = data.role;
                console.log("New employee added.")
                
                employeesArr.push(employee);
                console.table(employeesArr);
        
                start();

            })
        })
};


//Create an array lists from the current sql db tables
//user must select a department from the department list 
function viewDepartment() {
        const query = `SELECT department FROM department`;
            
        connection.query(query, function(err, res) {
            if (err) throw err;
            console.table(res);
            
            start();
        });
            

}; 


//Create a list of employees by going into the employee table and pulling from there/ 
function viewEmployees() {
    
    const query = `SELECT first_name, last_name, title FROM employee LEFT JOIN role ON role.id = employee.role_id`;

	connection.query(query, function(err, res) {
		if (err) throw err;
        
        console.table(res);

		start();
	});
}

function viewRoles() {

    const query = `SELECT title, salary FROM role` 

	connection.query(query, function (err, res) {
		if (err) throw err;
		console.table(res);

		start();
	});
}

