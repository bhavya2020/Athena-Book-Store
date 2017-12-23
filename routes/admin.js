const route=require('express').Router();
const book = require('../table.js');

route.get('/', (req, res) => {
    book.showBooks((books) => {
        res.send(books);
    })
});


route.post('/', (req, res) => {
    book.addBook(req.body,()=>{
        res.redirect('http://localhost:4646/admin');
    })
});

route.post('/:id', (req, res) => {
    if (isNaN(parseInt(req.params.id))) {
        return res.status(404).send({
            message: "Book not found"
        })
    }
    book.deleteBook(req.params.id,()=>{
        res.redirect('http://localhost:4646/admin');
    })

});
route.post('/plus/:id', (req, res) => {

    book.plusBook(req.params.id,()=>{
        res.redirect('http://localhost:4646/admin');
    })

});
route.post('/minus/:id', (req, res) => {

    book.minusBook(req.params.id,()=>{
        res.redirect('http://localhost:4646/admin');
    })

});
exports.route = route;