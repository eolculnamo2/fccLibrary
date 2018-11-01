const express = require('express');
const router = express.Router();
const BooksTasks = require('./BookTasks');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

//Post New Book
router.post('/books', (req,res) => new BooksTasks().saveBook(res, req.body.title) );

//Comment on Book
router.post('/books/:id', (req,res) => new BooksTasks().addBookComment(res, req.body));

//View All Books
router.get('/books', (req,res) => new BooksTasks().getAllBooks(res));

//View One Book by Id
router.get('/books/:id', (req,res) => new BooksTasks().getOneBook(res, req.params.id) );

//Detele All Books
router.delete('/books', (req,res) => new BooksTasks().deleteAllBooks(res) );

//Delete One Book
router.delete('/books/:id', (req,res) => new BooksTasks().deleteOneBook(res, req.params.id) );

module.exports = router;