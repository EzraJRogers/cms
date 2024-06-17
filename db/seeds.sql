INSERT INTO department (id,name)
VALUES (1,"Engineering"),
      (2,"Sales"),
      (3,"Legal"),
      (4,"Operations");
INSERT INTO role (id, title, salary,department_id)
VALUES (1, "Software Engineer",150000,1),
(2,"Lawyer",200000,3),
(3,"Legal Team Lead",100000,3),
(4,"Sales Advisors",50000,2),
(5,"IT Manager",100000,4);

INSERT INTO employee (id,first_name,last_name,role_id)
VALUES (1, "Jacob", "Smith", 2),
(2, "Andrew", "Davidson", 3),
(4, "Ana", "Vega", 4),
(3, "Selena ", "Quintalnilla", 1);