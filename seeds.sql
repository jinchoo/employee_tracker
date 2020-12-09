INSERT INTO department(department) VALUES
("Sales"),
("Engineering"),
("Marketing"),
("IT"),
("HR");

INSERT INTO role(role_type, salary, department_id) VALUES
("Account Manager", 130000.00, 2),
("Sales Lead", 90000.00, 1),
("Salesperson", 70000.00, 1),
("Software Engineer", 110000.00, 2),
("Lead Engineer", 130000.00, 2), 
("Marketing Director", 90000.00, 3),
("Marketing Associate", 90000.00, 3),
("Technical Director", 130000.00, 4),
("Technical Associate", 110000.00, 4);


INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES
("Albert", "Estrada", 2, 1),
("Jin", "Choo", 1, 2),
("Brody", "Choo", 4, 4),
("Dutches", "Estrada", 3, 1),
("Chili", "Wonker", 5, 6),
("Luna", "Bella", 1, 6),
("Meowzers", "Estrada", 9, 1);
