module.exports = function (req, res, next) {
    if (!req.body.title) {
        return res.status(400).send({message:'title is not null'});
    }
    next()
};
