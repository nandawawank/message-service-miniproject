const {ValidationParams} = require('../utils/Validation');
const PostResponse = require('../responses/PostResponse');
const InvariantError = require('../exceptions/InvariantError');

class MessageHandler {
    constructor(service) {
        this._service = service;

        this.getListMessage = this.getListMessage.bind(this);
        this.getContentMessage = this.getContentMessage.bind(this);
        this.createMessage = this.createMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.replyMessage = this.replyMessage.bind(this);
    }

    async getListMessage(request, response) {
        try {
            const listMessage = await this._service.getListMessage(request.body.data);
            response.statusCode = listMessage.statusCode;
            return response.json(listMessage);
        } catch (err) {
            response.statusCode = err.statusCode;
            return response.json(err);
        }
    }

    async getContentMessage(request, response) {
        try {
            const listMessage = await this._service.getContentMessage(request.params.chatId);
            response.statusCode = listMessage.statusCode;
            return response.json(listMessage);
        } catch (err) {
            response.statusCode = err.statusCode;
            return response.json(err);
        }
    }

    async createMessage(request, response) {
        try {
            const paramsRequired = Object.keys(request.body.data);
            const validate = ValidationParams(['chatName', 'messageFrom', 'messageTo'], paramsRequired);
            
            if (validate !== true) {
                response.statusCode = 406;
                return response.json(new InvariantError(406, 'Not Acceptable', `${validate} is required`));
            }

            const createMessage = await this._service.createNewMessage(request.body.data);
            response.statusCode = 201;
            return response.json(createMessage);
        } catch (err) {
            response.statusCode = 400;
            return response.json(err);
        }
    }

    async sendMessage(request, response) {
        try {
            const message = await this._service.sendMessage(request.body.data);
            response.statusCode = message.statusCode;
            return response.json(message);
        } catch (err) {
            response.statusCode = err.statusCode;
            return response.json(err);
        }
    }

    async replyMessage(request, response) {
        try {
            const message = await this._service.replyMessage(request.body.data)
            response.statusCode = message.statusCode;
            return response.json(message);
        } catch (err) {
            response.statusCode = err.statusCode;
            return response.json(err);
        }
    }
}

module.exports = MessageHandler;