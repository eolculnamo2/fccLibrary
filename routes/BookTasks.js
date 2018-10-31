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
            res.header("Content-Type",'application/json');
            res.send(JSON.stringify(result, null, 3));
        })
    }
    
    getAllBooks(res) {
        Book.find({}, (err,result) => {
            res.header("Content-Type",'application/json');
            res.send(JSON.stringify(result, null, 3));
        })
    }

    addBookComment(res, payload){
        Book.findOneAndUpdate({_id: payload.id},{$push: {comments: payload.comment}},(err,result)=>{
                                    if(err)console.log(err)
                                    res.header("Content-Type",'application/json');
                                    res.send(JSON.stringify(result, null, 3));
                                })
    }
}

module.exports = BookTasks;