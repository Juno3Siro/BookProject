module.exports = (req, res, next) =>{
    if (req.body.author.length > 40) {
        return res.send({message: "Author is not Null"})
    }
    next();
};