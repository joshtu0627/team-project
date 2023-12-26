const router = require('express').Router();

const { wrapAsync } = require('../../util/util');

const { createMessage, createRoom, getMessagesByRoomId, getRoomsByUserId } = require('../controllers/message_controller');

router.route('/message').post(wrapAsync(createMessage));

router.route('/message/room').post(wrapAsync(createRoom));

router.route('/message/:roomId').get(wrapAsync(getMessagesByRoomId));

router.route('/message/rooms/:userId').get(wrapAsync(getRoomsByUserId));

module.exports = router;
