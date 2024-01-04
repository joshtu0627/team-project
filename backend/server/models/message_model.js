const { pool } = require('./mysqlcon');

const createMessage = async (message) => {
    const conn = await pool.getConnection();
    try {
        console.log(message);
        delete message.nowRoom;
        const [result] = await conn.query('INSERT INTO message SET ?', message);
        return result.insertId;
    } catch (error) {
        console.log(error);
        return -1;
    } finally {
        if (conn) await conn.release();
    }
};

const createRoom = async (room) => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query('INSERT INTO rooms SET ?', room);
        return result.insertId;
    } catch (error) {
        console.log(error);
        return -1;
    } finally {
        if (conn) await conn.release();
    }
};

const getMessagesByRoomId = async (roomId) => {
    const conn = await pool.getConnection();
    try {
        const [messages] = await conn.query('SELECT * FROM message WHERE room_id = ?', [roomId]);
        return messages;
    } catch (error) {
        console.log(error);
        return [];
    } finally {
        if (conn) await conn.release();
    }
};

const getRoomsByUserId = async (userId) => {
    const conn = await pool.getConnection();
    try {
        const [rooms] = await conn.query('SELECT * FROM rooms WHERE user_id = ?', [userId]);
        return rooms;
    } catch (error) {
        console.log(error);
        return [];
    } finally {
        if (conn) await conn.release();
    }
};

const getAllRooms = async () => {
    const conn = await pool.getConnection();
    try {
        const [rooms] = await conn.query('SELECT * FROM rooms');
        return rooms;
    } catch (error) {
        console.log(error);
        return [];
    } finally {
        if (conn) await conn.release();
    }
};

module.exports = {
    createMessage,
    createRoom,
    getMessagesByRoomId,
    getRoomsByUserId,
    getAllRooms,
};
