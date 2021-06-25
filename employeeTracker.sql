DROP DATABASE IF EXISTS trackEmployeeDB;
CREATE database employee_trackerDB;

USE trackEmployeeDB;

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

--Data inserted to fancy the data tables!

("Manager", 105000, 1), 
("Sr. Developer", 100000, 3), 
("Jr. Developer", 5000, 3), 
("Advisor", 4750, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Jeff", "Bezos", 2, 3),
("Michael", "Scott", 3 , 2),
("Elon", "Musk", 4 , 1),
("Cameron", "Houck", 5 , 1),