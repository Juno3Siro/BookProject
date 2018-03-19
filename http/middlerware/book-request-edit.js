module.exports = function (req, res, next) {
	let factory = req.app.get('book.factory');
	factory.makeFromRequest(req.body).then(result => {
		req.book = result[0];
		console.log (req.book);
		next();
	});
};