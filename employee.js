//class for the employee  id, first name, last name, 
//inherits the role_id, inherits the managers id.
const manager = require('./role');

class Employee {
    constructor( first_name, last_name, role_id, manager_id) {

        this.first_name = first_name;
        this.last_name = last_name;
        // this.role_id = role_id;
        // this.manager_id = manager_id;

    }
}
module.exports = Employee;
