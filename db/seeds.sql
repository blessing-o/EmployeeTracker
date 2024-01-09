INSERT INTO department (name)
VALUES ("department 1"),
       ("department 2"),
       ("department 3"),
       ("department 4"),
       ("department 5");

INSERT INTO role (title, salary, department_id)
VALUES ("department 1 Manager", 80,1),
       ("department 1 Employee", 70,1),
       ("department 2 Manager", 60,2),
       ("department 2 Employee", 80,2),
       ("department 3 Manager", 90,3),
       ("department 5 Manager", 30,5),
       ("department 4 Manager", 30,4),
       ("department 5 Employee", 30,5), 
       ("department 3 Employee", 30,3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("BL","OK",5, NULL),
       ("EL","OK",7,NULL),
       ("IT","EG",6, NULL),
       ("CS","PW",1,NULL),
       ("TG","RE",3,NULL),
       ("HH","GI",2,4),
       ("HT","GDI",8,3),
       ("HH","GI",4,5);


       