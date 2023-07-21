CREATE DATABASE SCHOOL_PROJECT;
USE SCHOOL_PROJECT;

CREATE TABLE students(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    grade INT NOT NULL
);

SHOW TABLES;
DESCRIBE students;


INSERT INTO students(id, email, name, last_name, grade) VALUES(null, "omar-salas@outlook.com", "Omar", "Salas", 80);
INSERT INTO students(id, email, name, last_name, grade) VALUES(null, "juan-perez@gmail.com", "Juan", "Pérez", 100);

SELECT * FROM students;

/*
dotnet ef migrations add InitialCreate
dotnet ef database update
*/