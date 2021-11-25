const mssql = require('mssql');
const {nanoid} = require('nanoid');

const query = require('./query');
const config = require('../configs/database');


const PostResponse = require('../responses/PostResponse');
const GetResponse = require('../responses/GetResponse');

const NotFoundError = require('../exceptions/NotFoundError');
const InvariantError = require('../exceptions/InvariantError');

class MessageService {
    constructor() {
        this._pool = new mssql.ConnectionPool(config.sql_server);
        
        this._pool.on('error', (err) => {
            return new InvariantError(503, 'Service Unavailable', err);
        });
    }

    async #messageIsExistByChatName(chatName, member) {
        const isExist = new Promise((resolve, reject) => {
            this._pool.connect()
                .then((sql) => {
                    return sql.request()
                        .input('chatName', mssql.VarChar, chatName)
                        .input('member', mssql.VarChar, member)
                        .query(query.messageExistByChatName, (err, result) => {
                            this._pool.close();

                            if (err) return reject(err.message);
                            return resolve(result);
                        })
                })
                .catch((err) => {
                    // console.log(err);
                    this._pool.close();
                    return reject(err);
                })
        });
        
        return isExist;
    }

    async #messageIsExistById(id, member) {
        const isExist = new Promise((resolve, reject) => {
            this._pool.connect()
                .then((sql) => {
                    return sql.request()
                        .input('id', mssql.VarChar, id)
                        .input('member', mssql.VarChar, member)
                        .query(query.messageExistById, (err, result) => {
                            this._pool.close();

                            if (err) return reject(err.message);
                            return resolve(result);
                        })
                })
                .catch((err) => {
                    // console.log(err);
                    this._pool.close();
                    return reject(err.message);
                })
        });
        
        return isExist;
    }

    async #updateLastUpdatedMessage(data) {
        const updateLastUpdate = new Promise((resolve, reject) => {
            this._pool.connect()
                .then((sql) => {
                    sql.request()
                        .input('id', mssql.VarChar, data.id)
                        .input('member', mssql.VarChar, '%'+ data.messageFrom +'%')
                        .input('updatedAt', mssql.DateTime, new Date())
                        .query(query.updateLastActivityMessage, (err, result) => {
                            if (err) return reject(new InvariantError(400, 'Bad Request', err.message));
                            return resolve(true);
                        })
                })
                .catch((err) => {
                    this._pool.close();
                    return reject(new InvariantError(400, 'Bad Request', err.message));
                })
        });

        return updateLastUpdate;
    }

    async getListMessage(data) {
        const listMessage = new Promise((resolve, reject) => {
            this._pool.connect()
                .then((sql) => {    
                    return sql.request()
                        .input('member', mssql.VarChar, '%'+data.member+'%')
                        .query(query.getListMessage, (err, result) => {
                            this._pool.close();

                            if (err) return reject(new InvariantError(400, 'Bad Request', err.message)); 
                            if (result.rowsAffected < 1) return reject(new NotFoundError('Chat not found'));
                            return resolve(new GetResponse(200, 'Success', result.recordset));
                        });
                })
                .catch((err) => {
                    this._pool.close();
                    // console.log(err);
                    return reject(new InvariantError(400, 'Bad Request', err));
                })
        });

        return listMessage;
    }

    async getContentMessage(chatId) {
        const contentMessage = new Promise((resolve, reject) => {
            this._pool.connect()
                .then((sql) => {
                    return sql.request()
                        .input('chatId', mssql.VarChar, chatId)
                        .query(query.getContentMessage, (err, result) => {
                            this._pool.close();
                            if (err) return reject(new InvariantError(400, 'Bad Request', err.message));
                            if (result.rowsAffected < 1) return reject(new NotFoundError('Chat not found'));
                            return resolve(new GetResponse(200, 'Success', result.recordset));
                        });
                })
                .catch((err) => {
                    this._pool.close();
                    return reject(new InvariantError(400, 'Bad Request', err.message));
                });
        });

        return contentMessage;
    }

    async createNewMessage(data) {
        try {
            const exist = await this.#messageIsExistByChatName(data.chatName, '%'+ data.messageFrom + '%');
            if (exist.rowsAffected > 0) {
                return new InvariantError(400, 
                    'Bad Request', `Message with name ${data.chatName} already exists`);
            }
        } catch (err) {
            return new InvariantError(400,'Bad Request', err.message);
        }

        const newMessage = new Promise((resolve, reject) => {
            this._pool.connect()
                .then((sql) => {
                    const member = [data.messageFrom, data.messageTo];
                    return sql.request()
                        .input('id', mssql.VarChar, nanoid(10))
                        .input('chatName', mssql.VarChar, data.chatName)
                        .input('member', mssql.VarChar, member)
                        .input('createdAt', mssql.DateTime, new Date())
                        .query(query.addMessage, (err, _) => {
                            this._pool.close();

                            if (err) return reject(new InvariantError(400, 'Bad Request', err.message));
                            return resolve(new PostResponse(201, 'Created', `Chat with name ${data.chatName} has been created`));
                        })
                })
                .catch((err) => {
                    // console.log(err);
                    this._pool.close();
                    return reject(new InvariantError(400, 'Bad Request', err));
                })
        });

        return newMessage;
    }

    async sendMessage(data) {
        const exist = await this.#messageIsExistById(data.chatId, '%'+ data.messageFrom +'%');
        if (exist.rowsAffected < 1) return new InvariantError(400, 
            'Bad Request', `You cannot send message in chat ${data.chatName}`);

        const result = new Promise((resolve, reject) => {
            this._pool.connect()
            .then((sql) => {
                sql.request()
                    .input('id', mssql.VarChar, nanoid(10))
                    .input('chatId', mssql.Text, data.chatId)
                    .input('content', mssql.Text, data.content)
                    .input('messageFrom', mssql.VarChar, data.messageFrom)
                    .input('messageTo', mssql.VarChar, data.messageTo)
                    .input('createdAt', mssql.DateTime, new Date())
                    .query(query.sendMessage, async (err, _) => {
                        this._pool.close();
                        if (err) return reject(new InvariantError(400, 'Bad Request', err.message));

                        try {
                            await this.#updateLastUpdatedMessage(data);
                        } catch (err) {
                            return reject(err);
                        }

                        return resolve(new PostResponse(201, 'Created', 'New message has been sent'));
                    });
            })
            .catch((err) => {
                // console.log(err);
                return reject(new InvariantError(400, 'Bad Request', err.message));
            })
        });

        return result;
    }

    async replyMessage(data) {
        const exist = await this.#messageIsExistById(data.chatId, '%'+ data.messageTo +'%');
        if (exist.rowsAffected < 1) return new InvariantError(400, 
            'Bad Request', `You cannot send message in chat ${data.chatName}`);

        const result = new Promise((resolve, reject) => {
            this._pool.connect()
            .then((sql) => {
                sql.request()
                    .input('id', mssql.VarChar, nanoid(10))
                    .input('chatId', mssql.Text, data.chatId)
                    .input('content', mssql.Text, data.content)
                    .input('messageFrom', mssql.VarChar, data.messageFrom)
                    .input('messageTo', mssql.VarChar, data.messageTo)
                    .input('createdAt', mssql.DateTime, new Date())
                    .query(query.sendMessage, async (err, _) => {
                        this._pool.close();
                        if (err) return reject(new InvariantError(400, 'Bad Request', err.message));

                        try {
                            await this.#updateLastUpdatedMessage(data);
                        } catch (err) {
                            return reject(err);
                        }

                        return resolve(new PostResponse(201, 'Created', 'New message has been sent'));
                    });
            })
            .catch((err) => {
                // console.log(err);
                this._pool.close();
                return reject(new InvariantError(400, 'Bad Request', err.message));
            })
        });

        return result;
    }
}

module.exports = MessageService;