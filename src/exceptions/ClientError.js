class ClientError extends Error {
    constructor(statusCode, statusMessage) {
        super(statusCode, statusMessage);
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
    }
}

module.exports = ClientError;