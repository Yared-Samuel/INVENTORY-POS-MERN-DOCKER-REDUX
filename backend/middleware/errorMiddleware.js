const errorHandler = (err, req, res, next) => {

    // if there is err  use statusCode and assign it to statusCode
    const statusCode = res.statusCode ? res.statusCode : res.statusCode = 500;
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : null
    })
};

module.exports = errorHandler