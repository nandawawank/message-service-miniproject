module.exports = {
    getListMessage: `select * from chats where member like @member order by updatedAt desc`,
    getContentMessage: `select * from message where chatId = @chatId order by createdAt desc`,
    messageExistByChatName: `select * from chats where chatName = @chatName and member like @member`,
    messageExistById: `select * from chats where id = @id and member like @member`,
    addMessage: `insert into chats (id, chatName, member, updatedAt, createdAt) values (@id, @chatName, @member, @createdAt, @createdAt)`,
    sendMessage: `insert into message (id, chatId, content, messageFrom, messageTo, createdAt) values (@id, @chatId, @content, @messageFrom, @messageTo, @createdAt)`,
    replyMessage: `insert into message (id, chatId, content, messageFrom, messageTo, createdAt) values (@id, @chatId, @content, @messageFrom, @messageTo, @createdAt)`,
    updateLastActivityMessage: `update chats set updatedAt = @updatedAt where id = @id and member like @member`
}