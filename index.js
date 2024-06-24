const inquirer = require('inquirer');
const mysql = require('./config/connection');
const { type } = require('os');



const addDeparmentQuestion = [
  {
    type: 'input',
    name: 'departmentName',
    message: 'What is the name of the department?'

  }
]
const addRolesQuestions = (departmentarray) => [
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of your role?'
  },
  {
    type: 'input',
    name: 'salary',
    message: 'How much is your income with this role?'
  },
  {
    type: 'list',
    name: 'department_id',
    message: 'What department is your role in?',
    choices: departmentarray

  }
]

const addEmployeeQuestions = [
  {
    type: 'input',
    name: 'first_name',
    message: 'Please enter first name for new employee!',
  },
  {
    type: 'input',
    name: 'last_name',
    message: 'Please enter last name for new employee!'
  }
];

const updateEmployeeRolequestions = (departmentarray) => [
  {
    type: 'input',
    name: 'title',
    message: 'Would you like to update an employees role?'
  },
  {
    type: 'input',
    name: 'salary',
    message: 'What new salary range will this updated employee have?'
  },
  {
    type: 'list',
    name: 'department_id',
    message: 'What department is the role in that they are being updated to?',
    choices: departmentarray
  }


]

const menuQuestions = [
  {
    type: 'list',
    name: 'menuChoices',
    message: 'What would you like to do?',
    choices: ['View All Departments', 'Add Department', 'View Employees', ' Add Employee', 'View Roles', 'Add Roles', 'Update Employee Role', 'Quit']
  }
]

const viewDepartment = () => {
  mysql.promise().query('SELECT * from department;')
    .then(res => {
      console.table(res[0])
      displayList()
    });

}

const addDepartment = () => {
  inquirer
    .prompt(addDeparmentQuestion)
    .then(({ departmentName }) => {
      mysql.promise().query(`INSERT INTO department(name) VALUE ('${departmentName}');`)
        .then(res => {
          console.log(`Added ${departmentName} to database`);
          displayList();
        })
    })
}
const viewRoles = () => {
  mysql.promise().query('SELECT * from role;')
    .then(res => {
      console.table(res[0])
      displayList()
    });
}

const addRoles = async () => {
  const res = await mysql.promise().query('SELECT * from department;')
  const departmentarray = res[0].map(dpt => ({ name: dpt.name, value: dpt.id }))
  inquirer
    .prompt(addRolesQuestions(departmentarray))
    .then(({ title, salary, department_id }) => {
      mysql.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ('${title}',${salary},${department_id});`)
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
    .then(({ first_name, last_name }) => { // Destructure first_name and last_name from response
      mysql.promise().query(`INSERT INTO employee (first_name, last_name) VALUES ('${first_name}', '${last_name}');`)
        .then(res => {
          console.log(`Added employee ${first_name} ${last_name} to database`); // Correctly access first_name and last_name
          displayList(); // Display menu again after adding employee
        })
        .catch(err => {
          console.error('Error adding employee:', err);
          displayList(); // Display menu again after error
        });
    });
};

const updateEmployeeRole = async () => {
  const res = await mysql.promise().query('SELECT * from department;')
  const departmentarray = res[0].map(dpt => ({ name: dpt.name, value: dpt.id }))
  inquirer
    .prompt(updateEmployeeRolequestions(departmentarray))
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
    .prompt(menuQuestions)
    .then((response) => listOptions(response))
}

displayList();