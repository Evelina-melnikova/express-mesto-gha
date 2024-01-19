/* eslint-disable indent */
/* eslint-disable eol-last */
module.exports = ((e, req, res, next) => {
    // eslint-disable-next-line no-undef
    const { statusCode = 500 } = err;

    res
        .status(statusCode)
        .send({
            message: statusCode === 500
                ? 'На сервере произошла ошибка'
                : e.message,
        });

    next();
});