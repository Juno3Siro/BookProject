const Book = require('./book');
const Publisher = require('../publisher/publisher');
const connection = require('../../database/connection');
const PublisherProvider = require('../publisher/publisher-provider');

class BookFactory {
	
	/**
	 *
	 * @param {Object} bookRaw
	 * @return {Book}
	 */
	makeFromDB (bookRaw) {
		let book = new Book (bookRaw.title, bookRaw.author);
		book.setId (bookRaw.id);
		book.setPrice (bookRaw.price);
		let publisher = new Publisher (bookRaw.name);
		publisher.setId (bookRaw.publisher_id);
		publisher.setAddress (bookRaw.address);
		publisher.setPhone (bookRaw.phone);
		book.setPublisher (publisher);
		return book;
	}
	
	/**
	 *
	 * @param {Object} bookRaw
	 * @return {Book}
	 */
	makeFromRequest(bookRaw) {
		console.log (bookRaw,'bookRaw');
		let publisherProvider = new PublisherProvider();
		return publisherProvider.provider(bookRaw.publisher_id)
				.then( publisher => {
					
					let book = new Book(bookRaw.title, bookRaw.author);
					book.setPublisher(publisher[0]);
					book.setPrice(bookRaw.price);
					book.setId(bookRaw.id);
					return book;
				})
	}
}

module.exports = BookFactory;
