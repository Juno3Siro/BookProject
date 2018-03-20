const express = require('express');
const router = express.Router();
const BookController = require('../http/controller/api/book-controller');
const check = require('../http/middlerware');

let bookController = new BookController();

router.get('/', (req, res) => {
    res.render('list-book.njk', {title: 'Express'});
});

router.get('/api/books', check.searchCondition, bookController.search);

module.exports = router;