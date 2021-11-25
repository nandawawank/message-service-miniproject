const ClientError = require('./ClientError');

class NotFoundError extends ClientError {
    constructor(errorMessage) {
        super(statusCode = 404, statusMessage = 'Not Found');
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
        this.errorMessage = errorMessage;
    }
}

module.exports = NotFoundError;