let express = require('express');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
const BookRepository = require('./src/book/book-repository');
const connection = require('./database/connection');
const BookFactory = require('./src/book/book-factory');
const Searcher = require('./src/search-services/searcher');
const nunjucks = require('nunjucks');
const PublisherProvider = require('./src/publisher/publisher-provider');
const PublisherFactory  = require('./src/publisher/publisher-factory');

let index = require('./routes/index');

let app = express();

// view engine setup

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('books.repo', new BookRepository(connection));
app.set('book.searcher', new Searcher(connection, new BookFactory()));
app.set('publishers.provider', new PublisherProvider(connection, new PublisherFactory()));

app.use('/', index);

module.exports = app;
