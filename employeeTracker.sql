DROP DATABASE IF EXISTS employee_trackerDB;
CREATE database employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
  ID INT NOT NULL AUTO_INCREMENT,
  dept_name VARCHAR(30) NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE emp_role (
  ID INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2) NULL,
  dept_id INT NULL REFERENCES department(ID),
  PRIMARY KEY (ID)
);

CREATE TABLE employee (
  ID INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL REFERENCES emp_role(ID),
  manager_id INT NULL REFERENCES employee(ID),
  PRIMARY KEY (ID)
);

SELECT * FROM department;
SELECT * FROM emp_role;
SELECT * FROM employee;