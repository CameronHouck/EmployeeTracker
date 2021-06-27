USE employee_trackerDB;

INSERT INTO department (dept_name)
VALUES ("Sales"), ("Human Resources"), ("shipping"), ("accounting"), ("manager"), ("owner"), ("admin");

INSERT INTO emp_role (title, salary, dept_id)
VALUES 
("Manager", 105000, 1), 
("Architect", 100000, 4), 
("Senior Developer", 85000, 4), 
("Junior Developer", 65000, 4), 
("Intern", 25000, 4),
("Salesman", 45000, 1),
("HR", 60000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("jeff", "bezos", 2, 3),
("elon", "musk", 3 , 2),
("Casey", "johnson", 4 , 1),
("Alex", "qorbec", 5 , 1),
("jim", "Doyle", 1, 1),
("james", "Johnson", 7, 2),
("steven", "Reeves", 6, 1);