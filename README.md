pull mysql image from docker and create database called projects and create a table called Contact.

Run the below query :

Create table Contact(
id int NOT NULL AUTO_INCREMENT ,
phoneNumber varchar(255),
email varchar(255),
linkedId int,
linkPrecedence ENUM('primary', 'secondary'),
createdAt datetime,
updatedAt datetime,
deletedAt datetime,
primary key(id)
)

Change the configuration of DB according to your settings and run the application.

http://localhost:8082/contact/identify
