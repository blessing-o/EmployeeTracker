--  Build tables for department, roles and employees
-- The department table needs a column for id and name
-- The role table needs a column for id, title, salary and department_id(foreign key that links the role table to the department table)
-- The employee table needs a column for the id, firt_name, last_name, role_id(foreign key tha links the employee table to the role table) and manager_id(a self refrencing foreign key)

DROP DATABASE IF EXISTS employer_db;
CREATE DATABASE employer_db;

USE employer_db;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT,

    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE CASCADE 
);

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,

    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE CASCADE,

    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);