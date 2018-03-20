const express = require('express');
const router = express.Router();
const BookController = require('../http/controller/api/book-controller');
const check = require('../http/middlerware');

let bookController = new BookController();
let checkUpData = [check.authorNull, check.authorLength, check.titleLength, check.titleNull];

router.get('/', check.searchCondition, bookController.search);

router.get('/book/:id', check.searchCondition, bookController.search);

router.post('/book', checkUpData, check.bookRequest, bookController.createBook);

router.put('/book', checkUpData, check.bookRequestEdit, bookController.editBook);

router.delete('/book/:id', bookController.deleteBook);

router.get('/search-advance', check.searchCondition, bookController.search);

router.get('/api/books', check.searchCondition, bookController.search);


module.exports = router;