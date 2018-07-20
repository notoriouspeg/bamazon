-- Creates the "bamazon_db" database --
CREATE DATABASE bamazon_db;

-- Makes it so all of the following code will affect bamazon_db --
USE bamazon_db;

-- Creates the table "products" within bamazon_db --
CREATE TABLE products (
  -- Creates a numeric column called "item_id" which will automatically increment its default value as we create new rows --
item_id INTEGER(100) AUTO_INCREMENT NOT NULL,
  -- Makes a string column called "product_name" which cannot contain null --
  product_name VARCHAR(30) NOT NULL,
  -- Makes a string column called "department_name" which cannot contain null --
  department_name VARCHAR(30),
  -- Makes a numeric column called "price" --
  price INTEGER(10),
  -- Makes a numeric column called "stock_quality" --
  stock_quality INTEGER(10),
  -- Sets id as this table's primary key which means all data contained within it will be unique --
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quality)
VALUES ("Trapeze", "Circus Supplies", 21.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quality)
VALUES ("Tightrope", "Circus Supplies", 21.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quality)
VALUES ("Top Hat", "Circus Supplies", 11.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quality)
VALUES ("Lion", "Circus Supplies", 210.99, 1);

INSERT INTO products (product_name, department_name, price, stock_quality)
VALUES ("Big Top", "Circus Supplies", 21000.00, 1);

INSERT INTO products (product_name, department_name, price, stock_quality)
VALUES ("Stilts", "Circus Supplies", 12.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quality)
VALUES ("Unicycles", "Circus Supplies", 20.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quality)
VALUES ("German Wheel", "Circus Supplies", 2000, 10);

INSERT INTO products (product_name, department_name, price, stock_quality)
VALUES ("Spanish Web Ropes", "Circus Supplies", 100.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quality)
VALUES ("Trampoline", "Circus Supplies", 250.00, 70);


SELECT * FROM products;
