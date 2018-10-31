"use strict";
require('dotenv').config();
const express = require('express');
const app = express();
const helmet = require('helmet');
const mongoose = require('mongoose');
const api = require('./routes/apiController');

//Middleware
app.use(helmet());
app.use(express.static('public'));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.DB, {useNewUrlParser: true })
mongoose.connection.once('open',()=>{
    console.log("Connected to Mongo via Mongoose")
    }).on('error',(err) => console.log("Connection Error: " + err))


app.get("/",(req,res) => res.sendFile(__dirname+'/public/index.html') );

//Routes
app.use('/api',api);


app.listen(3000, () => console.log("Server Starting"));



/*

book:

id
title
likes
comments

Nothing from my website will be cached in my client as a security measure.
I will see that the site is powered by 'PHP 4.2.0' even though it isn't as a security measure.
I can post a title to /api/books to add a book and returned will be the object with the title and a unique _id.
I can get /api/books to retrieve an aray of all books containing title, _id, & commentcount.
I can get /api/books/{_id} to retrieve a single object of a book containing title, _id, & an array of comments (empty array if no comments present).
I can post a comment to /api/books/{_id} to add a comment to a book and returned will be the books object similar to get /api/books/{_id}.
I can delete /api/books/{_id} to delete a book from the collection. Returned will be 'delete successful' if successful.
If I try to request a book that doesn't exist I will get a 'no book exists' message.
I can send a delete request to /api/books to delete all books in the database. Returned will be 'complete delete successful' if successful.
All 6 functional tests requiered are complete and passing.
 */
