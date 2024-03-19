const { Chat, User, Message, UserChat } = require("../models");
const { Sequelize } = require("../db");
const { clearOrDeleteOneChatItem } = require("./common/common");

class chatService {
    updateChat = async (id) => {
        await Chat.update(
            {
                visibleForFirstChatter: true,
                visibleForSecondChatter: true,
            },
            {
                where: { id }
            }
        );
    };
    create = async (from, to) => {
        let response;
        const mayBeChat = await Chat.findOne({
            where: {
                [Sequelize.Op.or]: [
                    { firstChatterId: from, secondChatterId: to },
                    { firstChatterId: to, secondChatterId: from }
                ]
            }
        });
        if (mayBeChat) {
            if (
                mayBeChat.visibleForFirstChatter === false ||
                mayBeChat.visibleForSecondChatter === false
            ) {
                response = {
                    chatId: mayBeChat.id,
                    isFirstTime: true,
                };
            } else {
                response = {
                    chatId: mayBeChat.id,
                    isFirstTime: false,
                };
            }
            await this.updateChat(mayBeChat.id);
        } else {
            const chat = await Chat.create({ firstChatterId: from, secondChatterId: to });
            await UserChat.create({ userId: from, chatId: chat.id });
            await UserChat.create({ userId: to, chatId: chat.id });
            response = {
                chatId: chat.id,
                isFirstTime: true,
            };
        };
        return response;
    };
    get = async (oneOfChattersId) => {
        const chats = await Chat.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { firstChatterId: oneOfChattersId },
                    { secondChatterId: oneOfChattersId }
                ]
            },
            order: [
                ['updatedAt', 'DESC'],
            ],
        });
        const updatedChats = [];
        for (let i = 0; i < chats.length; i++) {
            const chat = chats[i];
            if (
                chat.dataValues.firstChatterId === oneOfChattersId
                && chat.dataValues.visibleForFirstChatter === false
                ||
                chat.dataValues.secondChatterId === oneOfChattersId
                && chat.dataValues.visibleForSecondChatter === false
            ) continue;
            const user = await User.findOne({
                where: {
                    id: chat.dataValues.firstChatterId === oneOfChattersId ?
                        chat.dataValues.secondChatterId : chat.dataValues.firstChatterId
                },
                attributes: ["name", "avatar"]
            });
            chat.dataValues.chatterName = user.name;
            chat.dataValues.chatterAva = user.avatar;
            const messages = await Message.findAll({ where: { idOfChat: chat.id } });
            const updatedMessages = [];
            for (let j = 0; j < messages.length; j++) {
                const message = messages[j];
                if (
                    chat.dataValues.firstChatterId === oneOfChattersId
                    && message.dataValues.visibleForFirstChatter === false
                    ||
                    chat.dataValues.secondChatterId === oneOfChattersId
                    && message.dataValues.visibleForSecondChatter === false
                ) continue;
                if (message.dataValues.from === oneOfChattersId)
                    message.dataValues.isOwn = true;
                else
                    message.dataValues.isOwn = false;
                updatedMessages.push(message.dataValues);
            };
            chat.dataValues.messages = updatedMessages;
            chat.dataValues.lastMessage = updatedMessages[updatedMessages.length - 1];
            updatedChats.push(chat.dataValues);
        };
        return updatedChats;
    };
    clearOne = async (chatId, chatterId) => {
        const updateObject = await clearOrDeleteOneChatItem(chatId, chatterId);
        await Message.update(
            updateObject,
            { where: { idOfChat: chatId } }
        );
    };
    deleteOne = async (chatId, chatterId) => {
        const updateObject = await clearOrDeleteOneChatItem(chatId, chatterId);
        await Chat.update(
            updateObject,
            { where: { id: chatId } }
        );
        await this.clearOne(chatId, chatterId);
    };
    clearAll = async (chatterId) => {
        const chats = await Chat.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { firstChatterId: chatterId },
                    { secondChatterId: chatterId }
                ]
            },
        });
        for (let i = 0; i < chats.length; i++) {
            const chat = chats[i].dataValues;
            await this.clearOne(chat.id, chatterId);
        };
    };
    deleteAll = async (chatterId) => {
        const chats = await Chat.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { firstChatterId: chatterId },
                    { secondChatterId: chatterId }
                ]
            },
        });
        for (let i = 0; i < chats.length; i++) {
            const chat = chats[i];
            await this.deleteOne(chat.id, chatterId);
        };
    };
};

module.exports = new chatService();