const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const SAFE_ERROR_MESSAGE = 'Oops! Something went wrong :(';
const SAFE_USER_ERROR_MESSAGE = 'We hit a snag processing your request. Please file a support ticket.';

class BaseError extends Error {
    constructor(options) {
        super();
        this.statusCode = options.statusCode;
        this.message = options.message || SAFE_ERROR_MESSAGE;
        this.userMessage = options.userMessage || SAFE_USER_ERROR_MESSAGE;
    }
}

class InvalidRequestError extends BaseError {
    constructor(options) {
        super({
            statusCode: StatusCodes.BAD_REQUEST,
            message: options?.message || ReasonPhrases.BAD_REQUEST,
            userMessage: options?.userMessage,
        });
    }
}

class InternalServerError extends BaseError {
    constructor(options) {
        super({
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: options?.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
            userMessage: options?.userMessage,
        });
    }
}

class NotFoundError extends BaseError {
    constructor(options) {
        super({
            statusCode: StatusCodes.NOT_FOUND,
            message: options?.message || ReasonPhrases.NOT_FOUND,
            userMessage: options?.userMessage,
        });
    }
}

class UnauthorizedError extends BaseError {
    constructor(options) {
        super({
            statusCode: StatusCodes.UNAUTHORIZED,
            message: options?.message || ReasonPhrases.UNAUTHORIZED,
            userMessage: options?.userMessage,
        });
    }
}

class ConflictError extends BaseError {
    constructor(options) {
        super({
            statusCode: StatusCodes.CONFLICT,
            message: options?.message || ReasonPhrases.CONFLICT,
            userMessage: options?.userMessage,
        });
    }
}

module.exports = {
    SAFE_ERROR_MESSAGE,
    SAFE_USER_ERROR_MESSAGE,
    BaseError,
    InvalidRequestError,
    InternalServerError,
    NotFoundError,
    UnauthorizedError,
    ConflictError,
};
