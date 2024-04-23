/* borramos la base de datos en caso exista para hacer las pruebas */
DROP DATABASE IF EXISTS proyecto_dh;

/* creamos la base de datos */
CREATE DATABASE proyecto_dh;

/* Definimos la base de datos en la cual vamos a crear las tablas  */
USE proyecto_dh;

/* CREACION DE LA TABLA de categoría de usuarios (administrador, cliente) */
CREATE TABLE users_categories (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(20) NOT NULL
);

/* CREACION DE LA TABLA de usuarios que se registran en el sistema */
CREATE TABLE users (
 id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 nombre VARCHAR(25) NOT NULL,
 apellido VARCHAR(25) NOT NULL,
 email  VARCHAR(40) NOT NULL,
 contrasenia VARCHAR(100) NOT NULL,
 direccion VARCHAR(40) NOT NULL,
 telefono BIGINT NULL,
 imagen VARCHAR(25) NOT NULL,
 id_categoria INT NOT NULL,
 activo TINYINT NOT NULL,
 
 FOREIGN KEY (id_categoria) REFERENCES users_categories(id)
);
