const Message = require('../models/message_model');

const createMessage = async (req, res) => {
    let { message } = req.body;
    message = JSON.parse(message);
    const messageId = await Message.createMessage(message);
    if (messageId == -1) {
        res.status(500);
    } else {
        res.status(200).send({ messageId });
    }
};

const createRoom = async (req, res) => {
    let room = req.body.room;
    console.log(room);
    // room = JSON.parse(room);

    const roomId = await Message.createRoom(room);
    if (roomId == -1) {
        res.status(500);
    } else {
        res.status(200).send({ roomId });
    }
};

const getMessagesByRoomId = async (req, res) => {
    const roomId = req.params.roomId;

    const messages = await Message.getMessagesByRoomId(roomId);
    if (messages == -1) {
        res.status(500);
    } else {
        res.status(200).send({ messages });
    }
};

const getRoomsByUserId = async (req, res) => {
    const userId = req.params.userId;

    const rooms = await Message.getRoomsByUserId(userId);
    if (rooms == -1) {
        res.status(500);
    } else {
        res.status(200).send({ rooms });
    }
};

module.exports = {
    createMessage,
    createRoom,
    getMessagesByRoomId,
    getRoomsByUserId,
};
