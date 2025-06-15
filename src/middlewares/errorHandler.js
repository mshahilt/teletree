const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).render('pages/error', {
    title: 'Error',
    message: err.message || 'Internal Server Error',
    statusCode
  });
};

module.exports = errorHandler;
