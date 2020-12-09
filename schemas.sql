DROP DATABASE IF EXISTS employeetracker_db;

CREATE DATABASE employeetracker_db;

USE employeetracker_db;

CREATE TABLE department(
department_id INT NOT NULL AUTO_INCREMENT,
department VARCHAR(30),
PRIMARY KEY (department_id)
);

CREATE TABLE role(
role_id INT NOT NULL AUTO_INCREMENT,
role_type VARCHAR(30),
salary DECIMAL(10,4) NOT NULL,
department_id INT NOT NULL,
PRIMARY KEY (role_id),
FOREIGN KEY (department_id) REFERENCES department(department_id)
);

CREATE TABLE employee(
employee_id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30),
role_id INT NOT NULL,
manager_id INT DEFAULT NULL,
PRIMARY KEY (employee_id), 
FOREIGN KEY (role_id) REFERENCES role(role_id)
);
