const route=require('express').Router();
const products = require('../db/table');

route.get('/', (req, res) => {
    products.showBook((books) => {
        res.send(books);
    })
});
route.get('/price', (req, res) => {
    products.filterbyprice((books) => {
        res.send(books);
    })
});
route.get('/popularity', (req, res) => {
    products.filterbypopularity((books) => {
        res.send(books);
    })
});
route.get('/stock', (req, res) => {
    products.filterbystock((books) => {
        res.send(books);
    })
});

// route.post('/:id', (req, res) => {
//     if (isNaN(parseInt(req.params.id))) {
//         return res.status(404).send({
//             message: "Product not found"
//         })
//     }
//     products.findOne({where:{id:req.params.id}})
//         .then((product) => res.send(product))
//         .catch(err => console.error(err))
// });
exports.route = route;