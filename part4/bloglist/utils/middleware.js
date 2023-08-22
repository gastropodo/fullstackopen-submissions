const jwt = require('jsonwebtoken');
const { NotFoundError, UnauthorizedError } = require('./errors');
const logger = require('./logger');
const config = require('../utils/config');
const User = require('../models/user');

const requestLogger = (req, res, next) => {
    logger.info('Method:', req.method);
    logger.info('Path:  ', req.path);
    logger.info('Body:  ', req.body);
    logger.info('---');
    next();
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
        req.token = authorization.replace('Bearer ', '');
    }
    next();
}

const userExtractor = async (req, res, next) => {
    const token = req.token;
    if(!token) throw new UnauthorizedError('Invalid token.');
    const decodedToken = jwt.verify(req.token, config.SECRET);
    if (!decodedToken.id) throw new UnauthorizedError('Invalid token.');
    const user = await User.findById(decodedToken.id);
    if(!user) throw new UnauthorizedError('Invalid token.');
    req.user = user;
    next();
}

const unknownEndpoint = (req, res) => {
    next(new NotFoundError('Unknown endpoint.'));
}

const errorHandler = (error, req, res, next) => {
    logger.error(error.message);
    switch (error.name) {
        case 'CastError':
            res.status(400);
            error.message = 'Malformatted ID.';
            break;
        case 'ValidationError':
            res.status(400);
            break;
        case 'BadRequestError':
            res.status(400);
            break;
        case 'UnauthorizedError':
            res.status(401);
            break;
        case 'JsonWebTokenError':
            res.status(401);
            error.message = 'Invalid token.';
            break;
        case 'NotFoundError':
            res.status(404);
            break;
        default:
            res.status(500);
            error.message = 'Internal server error.';
    }
    res.json({ error: error.message });
}

module.exports = {
    requestLogger,
    tokenExtractor,
    userExtractor,
    unknownEndpoint,
    errorHandler
}