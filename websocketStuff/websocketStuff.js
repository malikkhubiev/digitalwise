const { getHomepageRecievers, getCommentsRecievers } = require("../services/wsService");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const broadcastConnection = async(aWss, ws, message) => {
    let recievers = [];
    if (message.data.type === "chats") {
        recievers.push(message.data.body.from);
        recievers.push(message.data.body.to);
    }else if (message.data.type === "images") {
        const result = await getHomepageRecievers(message.data.body.ownId);
        recievers = result;
        delete message.data.body.ownId;
    }else{
        return aWss.clients.forEach(client => {
            if (client.imageId === message.data.body.imageId &&
                client.type === message.data.type) {
                const messageWithoutImageId = JSON.parse(JSON.stringify(message.data.body));
                delete messageWithoutImageId.imageId;
                client.send(JSON.stringify(messageWithoutImageId));
            };
        });
    };
    aWss.clients.forEach(client => {
        if (recievers.includes(client.id) && client.type === message.data.type) {
            client.send(JSON.stringify(message.data.body));
        };
    });
};

const messagesHandler = (message, ws, aWss) => {
    message = JSON.parse(message);
    const {token} = message;
    const decoded = jwt.verify(token, SECRET_KEY);
    const id = decoded.id;
    message.id = id;
    switch (message.method) {
        case "connection":
            ws.id = id;
            ws.type = message.type;
            if (message.imageId)
                ws.imageId = message.imageId;
            break;
        case "message":
            broadcastConnection(aWss, ws, message);
            break;
    };
};

module.exports = messagesHandler;