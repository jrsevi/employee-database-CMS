use employee_db

INSERT INTO department (name) VALUES
('Engineering'),
('Sales'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, department_id) 
VALUES  ('Server', 30000, 1),
        ('Host', 25000, 1),
        ('Bartender', 40000, 2),
        ('Bar Back', 30000, 2 ),
        ('Line Cook', 50000, 3),
        ('Accountant', 50000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
       ('Mike', 'Chan', 2, NULL),
       ('Ashley', 'Rodriguez', 3, NULL),
       ('Kevin', 'Tupik', 4, NULL),
       ('Malia', 'Brown', 5, NULL),
       ('Sarah', 'Lourd', 6, NULL),
       ('Tom', 'Allen', 7, NULL);


UPDATE employee SET manager_id = 1 WHERE first_name = 'Mike' AND last_name = 'Chan';
UPDATE employee SET manager_id = 3 WHERE first_name = 'Kevin' AND last_name = 'Tupik';
UPDATE employee SET manager_id = 6 WHERE first_name = 'Tom' AND last_name = 'Allen';