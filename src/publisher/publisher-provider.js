const Publisher  = require('./publisher');
const connection = require('../../database/connection');
const PublisherFactory = require('./publisher-factory');

class PublisherProvider {
	
	/**
	 *
	 * @param connection
	 */
	constructor(connection) {
		//todo
		this.connection = connection;
	}
	
	/**
	 *
	 * @param id
	 * @return {*|PromiseLike<Publisher>|Promise<Publisher>}
	 */
	provider(id) {
		let factory = new PublisherFactory();
		return connection('publishers').where({'publishers.id': id})
				.then(results => results.map(element => factory.make(element)))
	}
	
	
	ProviderAll() {
		let factory = new PublisherFactory();
		return this.connection.select().from('publishers')
				.where({deleted_at: null})
				.then(publisherRaw => publisherRaw.map(element => factory.make(element)));
	}
}

module.exports = PublisherProvider;
