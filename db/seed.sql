use employee_db

INSERT INTO department (name) VALUES
('Engineering'),
('Sales'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, department_id) VALUES
('Software Developer', 100000, 1),
('Sales Lead', 75000, 2),
('Accountant', 60000, 3),
('Lawyer', 90000, 4);
('Sales Associate', 50000, 2),
('Accountant', 60000, 3),

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Jeremy', 'Sevilla', 1, NULL),
('Matt', 'Niebergall', 2, 1),
('Sarah', 'Chiu', 3, 1),
('Sloane', 'McKinney', 4, 1),
('Tina', 'Lee', 5, 5),
('John', 'Smith', 6, 6),
('Karen', 'Johnson', 7, 7);

UPDATE employee SET manager_id = 1 WHERE first_name = 'Matt' AND last_name = 'Niebergall';
UPDATE employee SET manager_id = 2 WHERE first_name = 'Sarah' AND last_name = 'Chiu';
UPDATE employee SET manager_id = 3 WHERE first_name = 'Sloane' AND last_name = 'McKinney';
```