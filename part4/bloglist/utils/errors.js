class NotFoundError extends Error {
    name = 'NotFoundError';
};

class BadRequestError extends Error {
    name = 'BadRequestError';
};

class UnauthorizedError extends Error {
    name = 'UnauthorizedError';
}


module.exports = {
    NotFoundError, BadRequestError, UnauthorizedError
}