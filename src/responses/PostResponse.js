const ClientResponse = require('./ClientResponse');

class PostResponse extends ClientResponse {
    constructor(statusCode, statusMessage, resultMessage) {
        super(statusCode, statusMessage)
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
        this.resultMessage = resultMessage;
    }
}

module.exports = PostResponse;