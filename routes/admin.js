const route=require('express').Router();
const book = require('../db/table');

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

// route.post('/:id', (req, res) => {
//     if (isNaN(parseInt(req.params.id))) {
//         return res.status(404).send({
//             message: "Product not found"
//         })
//     }
//     products.destroy({where:{id:req.params.id}})
//         .then(()=> res.redirect('http://localhost:5656/admin'))
//         .catch(err => console.error(err))
// });
exports.route = route;