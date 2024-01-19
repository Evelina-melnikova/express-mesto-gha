module.exports = ((e, req, res, next) => {
    const { statusCode = 500 } = err;

    res
        .status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : e.message, });

    next();
});