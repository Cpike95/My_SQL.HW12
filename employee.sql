-- DROP DATABASE IF EXISTS employeeDB;
-- CREATE database employeeDB;

-- CREATE TABLE department (

--     id INT AUTO_INCREMENT,

--     name VARCHAR(30) NOT NULL,

--     PRIMARY KEY(id)
-- );

-- CREATE TABLE role (
   
--     id INT NOT NULL AUTO_INCREMENT,
    
--     title VARCHAR(30) NOT NULL,  -- to hold role title

--     salary DECIMAL (10,4) NOT NULL,

--     department_id INT -- to hold reference to department role belongs to

--     PRIMARY KEY(id)
-- );

-- CREATE TABLE employee (
--     id INT AUTO_INCREMENT,

--     first_name VARCHAR(30) NOT NULL, -- to hold employee first name

--     last_name  VARCHAR(30) NOT NULL, -- to hold employee last name

--     role_id INT, -- to hold reference to role employee has

--     manager_id  INT -- to hold reference to another employee that 
--             -- manager of the current employee. This field may be 
--             -- null if the employee has no manager 
--     PRIMARY KEY(id)
-- );

-- SELECT * FROM department;
-- SELECT * FROM role;
-- SELECT * FROM employee;

