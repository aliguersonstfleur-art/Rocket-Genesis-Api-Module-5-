const baseMiddleware = (req, res, next) => {
    const accessToken = req.headers.authorization;

    if (!accessToken || accessToken !== process.env.ACCESS_TOKEN) {
        return res.status(403).json({
            success: false,
            message: 'Access Forbidden',
        });
    }

    next();
};

export default baseMiddleware;
