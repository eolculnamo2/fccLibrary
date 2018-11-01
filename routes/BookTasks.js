const Book = require('../models/Book');
const path = require('path');

class BookTasks {
    saveBook(res, title) {
        new Book({
            title: title,
            likes: 0,
            comments: []
        }).save((err, book)=>{
            if(err) console.log(err);
            else console.log('Book saved');
        });

        res.sendFile(path.join(__dirname,'..','/public/index.html'));
    }

    getOneBook(res, id) {
        Book.findOne({_id: id}, (err,result) => {
            if(result) {
                res.header("Content-Type",'application/json');
                res.send(JSON.stringify(result, null, 3));
            }
            else {
                res.header("Content-Type",'text/html');
                res.send("No book found.")
            }
        });
    }
    
    getAllBooks(res) {
        Book.find({}, (err,result) => {
            result.forEach( x => x.comments = x.comments.length);
            res.header("Content-Type",'application/json');
            res.send(JSON.stringify(result, null, 3));
        });
    }

    addBookComment(res, payload){
        Book.findOneAndUpdate({_id: payload.id},{$push: {comments: payload.comment}},(err,result)=>{
                                    if(err)console.log(err)
                                    if(result) {
                                        res.header("Content-Type",'application/json');
                                        res.send(JSON.stringify(result, null, 3));
                                    }
                                    else {
                                        res.header("Content-Type",'text/html');
                                        res.send({message: "Book not found."})
                                    }
                                });
    }

    deleteAllBooks(res) {
        Book.deleteMany({}, (err,result) => {
            res.header("Content-Type",'application/json');
            res.send({message: "All Books Deleted"});
        });
    }

    deleteOneBook(res, id) {
        Book.deleteOne({_id: id}, (err,result) => {
            res.header("Content-Type",'application/json');
            if(result) {
                res.send({message: 'Book deleted'});
            }
            else{
                res.send({message: "Book not found"})
            }
        });
    }
}

module.exports = BookTasks;