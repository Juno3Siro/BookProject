const PublisherProvide = require('./src/publisher/publisher-provider');
const connection = require('./database/connection');
const factory = require('./src/publisher/publisher-factory');

let provide = new PublisherProvide(connection, new factory());

provide.listProvider().then(function (result) {
	console.log (result);
});