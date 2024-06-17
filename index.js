const inquirer = require('inquirer');
const mysql = require('./config/connection');
const { type } = require('os');

const departmentQuestion = [
    {
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department?'
    }
]

const jobRoleQuestions = (employeeQarray) => [
    {
        type: 'input',
        name: 'title',
        message: 'What is the name of the job role?'
    },
    {
        type: 'input',
        name:'salary',
        message: 'What is the salary of the job role?'
    },
    {
        type: 'list',
        name: 'department_id',
        message: 'What is the department of the job role?',
        choices: employeeQarray
    }
]

const employeeQuestions = [
    {
        type: 'input',
        name: 'first_name',
        message: 'What is the first name of the employee?'
    },
    {
        type: 'input',
        name: 'last_name',
        message: 'What is the last name of the employee?'
    }
]

const updateEmployeeJobQuestions = (employeeQarray) => [
    {
        type: 'input',
        name: 'title',
        message: 'Would you like to update an employee?',
    },
    {
        type: 'input',
        name: 'salary',
        message: 'What is the new salary of the updated employee?',
    },
    {
        type: 'list',
        name: 'department_id',
        message: 'What is the new department of the updated employee?',
        choices: employeeQarray
    }
]

const menuNav = [
    {
        type: 'list',
        name:'menu',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'Add Department',
            'View all employees',
            'Add Employee',
            'View Roles',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]
    }
]

const viewAllDepartments = () => {
    mysql.promise().query('SELECT * from department;')
    .then(res => {
         console.table(res[0]);
         displayList();
     });
}

const addDepartment = () => {
    inquirer
     .prompt(departmentQuestion)
     .then(res => {
          mysql.promise().query('INSERT INTO department (name) VALUES (?)', [res.department]);
          console.log('Department added!');
          displayList();
      });
}

const viewAllRoles = () => {
    mysql.promise().query('SELECT * from role;')
    .then(res => {
         console.table(res[0]);
         displayList();
     });
}

const addRole = async () => {
    const res = await mysql.promise().query('SELECT * from department;')
    const employeeQarray = res[0].map(dpt => ({ name: dpt.name, value: dpt.id }))
    inquirer
     .prompt(jobRoleQuestions(employeeQarray))
     .then(({title, salary, department_id}) => {
        mysql.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ('${title}',${salary}',${department});`)
        .then(res => {
            console.log(`Added ${title} to database`);
            displayList();
        })
    })
}

     const viewEmployee = () => {
        mysql.promise().query('SELECT * from employee;')
          .then(res => {
            console.table(res[0])
            displayList()
          });
      }
      
      const addEmployee = () => {
        inquirer
          .prompt(addEmployeeQuestions)
          .then(({ employeeInfo }) => {
            mysql.promise().query(`INSERT INTO employee (first_name,last_name) VALUES ('${first_name}', ${last_name});`)
              .then(res => {
                console.log(`Added ${employeeInfo} to database`);
                displayList();
              })
          })
      }
      
      const updateEmployeeRole = async () => {
        const res = await mysql.promise().query('SELECT * from department;')
        const employeeQarray = res[0].map(dpt => ({ name: dpt.name, value: dpt.id }))
        inquirer
          .prompt(updateEmployeeRolequestions(employeeQarray))
          .then(({ title, salary, department_id }) => {
            mysql.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ('${title}',${salary},${department_id});`)
              .then(res => {
                console.log(`Added ${title} to database`);
                displayList();
              })
          })
      }
      
      const listOptions = (response) => {
        switch (response.menuChoices) {
          case 'View All Departments':
            viewDepartment();
            break;
          case 'Add Department':
            addDepartment();
            break;
          case 'View Employees':
            viewEmployee();
            break;
          case 'Add Employee':
            addEmployee();
            break;
          case 'View Roles':
            viewRoles();
            break;
          case 'Add Roles':
            addRoles();
            break;
          case 'Update Employee Role':
            updateEmployeeRole();
            break;
      
          case 'Quit':
            console.log('Complete');
            mysql.end();
            break;
      
        }
      }
      
      const displayList = () => {
        inquirer
          .prompt(menuNav)
          .then((response) => listOptions(response))
      }
      
      displayList();