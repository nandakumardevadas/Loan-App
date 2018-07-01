module.exports = function(err, req, res, next) {
    //var error = new Error("Not Found");
    //err.status = 404;
    next(err);
}