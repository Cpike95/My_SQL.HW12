//class for the role holds id, title, salary and iherits the department id. 
const department = require('./department');

class Role {
    constructor( title, salary, ) {

        this.title = title;
        this.salary =salary;
    }
}

module.exports = Role;
