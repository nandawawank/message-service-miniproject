class ClientResponse {
    constructor(statusCode, statusMessage) {
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
    }
}

module.exports = ClientResponse;