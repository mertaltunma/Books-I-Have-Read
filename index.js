// Relevant packages should be imported.
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

// API should be connected to database.
const db=new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"book",
    password:"mert123",
    port:5432
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET ROUTE
// Orders books by title or rating according to choice of user.
app.get("/", async(req, res) => {
    try {
        const sortParam=req.query.sort || 'title';
        let queryString="SELECT * FROM books ORDER BY ";
        if (sortParam === 'title') {
            queryString += 'title ASC';
        } else if (sortParam === 'rating') {
            queryString += 'rating DESC';
        }
        const result=await db.query(queryString);
        let books=result.rows;
        res.render("index.ejs",{books:books});
    } catch (error) {
        console.log(error);
    }
});

// EDIT THE NOTES
app.post("/edit",async(req,res)=>{
    try {
        const id=req.body.editBookId;
        let notes=req.body.notes;
        await db.query("UPDATE books SET notes=$1 WHERE id=$2",[notes,id]);
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
});

// DELETE THE BOOK
app.post("/delete",async(req,res)=>{
    try {
        const id = req.body.deleteBookId;
        await db.query("DELETE FROM books WHERE id=$1",[id]);
        res.redirect("/");
    } catch (error) {   
        console.log(error);
    }
});

// GO TO THE PAGE "ADD NEW BOOK" 
app.post("/addbook",async(req,res)=>{
    try {
        if (req.body.add=="new") {
            res.render("new.ejs");
        } else {
            res.redirect("/");
        }
    } catch (error) {
        console.log(error);
    }
});

// ADD NEW BOOK
app.post("/new",async(req,res)=>{
    try {
        const title=req.body.title;
        const author=req.body.author;
        const date_read=req.body.date_read;
        const rating=req.body.rating;
        const book_cover=req.body.book_cover;
        const isbn=req.body.isbn;
        const notes=req.body.notes;
        const amazon_link=req.body.amazon_link;
        await db.query("INSERT INTO books(title,author,date_read,rating,book_cover,isbn,notes,amazon_link) VALUES($1,$2,$3,$4,$5,$6,$7,$8)",
        [title,author,date_read,rating,book_cover,isbn,notes,amazon_link]);
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
});

// Listens on port 3000.
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});