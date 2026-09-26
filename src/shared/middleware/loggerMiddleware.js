const loggerMiddleware = (req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
};

export default loggerMiddleware;
