const express        = require('express');
const router         = express.Router();
const BookController = require('../http/controller/book-controller');
const check          = require('../http/middlerware/index');
const condition      = require('../src/search-services/index');

let checkEdit      =[check.authorNull, check.authorLength, check.titleLength, check.titleNull, check.bookRequestEdit];
let checkCreate    = [check.authorNull, check.authorLength, check.titleLength, check.titleNull, check.bookRequest];
let bookController = new BookController();

router.get('/', function (req, res, next) {
    req.condition = new condition.UnDeletedSearch();
    next()
}, bookController.getAll);

router.get('/book/:id', function (req, res, next) {
    req.condition = new condition.IdSearchCondition(req.params.id);
    next()
}, bookController.detail);

router.get('/api/books', function (req, res, next) {
    req.condition = new condition.KeywordSearchCondition(req.query.keyword);
    next();
}, bookController.getAll);

router.get('/create', bookController.bookFromCreate);

router.post('/create', checkCreate, bookController.createBook);

router.get('/edit/:id', function (req, res, next) {
    req.condition = new condition.IdSearchCondition(req.params.id);
    next()
}, bookController.bookFromEdit);

router.post('/edit', checkEdit, bookController.editBook);

module.exports = router;
