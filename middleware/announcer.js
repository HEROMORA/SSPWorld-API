const AppError = require('../utils/appError');

module.exports = function(req, res, next) {
    if (req.user.role !== 'repre' && req.user.role !== 'ta') {
        //return res.status(403).send({error: 'Access Denied'});
        return next(new AppError('Access Denied', 403));
    }

    next();
}