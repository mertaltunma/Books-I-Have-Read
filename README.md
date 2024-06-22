# Books-I-Have-Read
Website which shows the information of each book read by the user. The user could visit the Amazon page of any book, sort the books by title or rating, edit the notes about the book, delete the selected book and add new book.  

After forking the project, make sure that you are in the same directory with project folder in Terminal. Then, write "npm i" in Terminal. Necessary packages will be downloaded. Then, write "nodemon index.js" in Terminal. The website will be started to run on localhost. Finally, open your browser and type "localhost:3000" in search bar.

You must be having a PostgreSQL server which has the following properties:

user:"postgres"
host:"localhost"
password:"mert123"
port:5432

You must create new database named "book". Inside the query of the database named "book", you must write following code:

create table books(
	id serial primary key,
	title text,
	author text,
	date_read text,
	rating text,
	book_cover text,
	isbn text,
	notes text,
	amazon_link text
);

Finally, you must execute the code.
