require('dotenv').config();
const validator = require('validator');
const { TAPPAY_PARTNER_KEY, TAPPAY_MERCHANT_ID } = process.env;
const Order = require('../models/order_model');
const { getProductById } = require('../models/product_model');

const checkout = async (req, res) => {
    const data = req.body;

    if (!data.order || !data.order.total || !data.order.list || !data.prime) {
        res.status(400).send({ error: 'Create Order Error: Wrong Data Format' });
        return;
    }
    const user = req.user;
    const now = new Date();
    const number = '' + now.getMonth() + now.getDate() + (now.getTime() % (24 * 60 * 60 * 1000)) + Math.floor(Math.random() * 10);
    const orderRecord = {
        number: number,
        time: now.getTime(),
        status: -1, // -1 for init (not pay yet)
        total: data.order.total,
        details: validator.blacklist(JSON.stringify(data.order), '<>'),
    };
    orderRecord.user_id = user && user.id ? user.id : null;
    const orderId = await Order.createOrder(orderRecord);

    let paymentResult;
    try {
        paymentResult = await Order.payOrderByPrime(TAPPAY_PARTNER_KEY, TAPPAY_MERCHANT_ID, data.prime, data.order);
        if (paymentResult.status != 0) {
            res.status(400).send({ error: 'Invalid prime' });
            return;
        }
    } catch (error) {
        res.status(400).send({ error });
        return;
    }
    const payment = {
        order_id: orderId,
        details: validator.blacklist(JSON.stringify(paymentResult), '<>'),
    };
    await Order.createPayment(orderId, payment);
    res.send({ data: { number } });
};

// chiu
const getPaidOrders = async (req, res) => {
    const user_id = req.params.userId;
    const orders = await Order.getPaidOrders(user_id);
    for (let order of orders) {
        try {
            // const orderDetails = JSON.parse(order.details);
            const orderDetails = order.details;
            const orderList = orderDetails.list;
            for (let product of orderList) {
                console.log(product);
                const item = await getProductById(product.id);
                console.log(item);
                product.title = item.title;
            }
        } catch (error) {
            console.error(`Error parsing JSON for order ${order.id}: ${order.details}`);
            console.error(error);
        }
    }
    res.status(200).send({ data: orders });
}

// For Load Testing
const getUserPayments = async (req, res) => {
    const orders = await Order.getUserPayments();
    const userPayments = orders.reduce((obj, order) => {
        let userId = order.user_id;
        if (!(userId in obj)) {
            obj[userId] = 0;
        }
        obj[userId] += order.total;
        return obj;
    }, {});
    const userPaymentsData = Object.keys(userPayments).map((userId) => {
        return {
            userId: parseInt(userId),
            totalPayment: userPayments[userId],
        };
    });
    res.status(200).send({ data: userPaymentsData });
};

const getUserPaymentsGroupByDB = async (req, res) => {
    const orders = await Order.getUserPaymentsGroupByDB();
    res.status(200).send({ data: orders });
};

const modifyOrderReviewStatus = async(req, res) => {
    const { order_id, product_id } = req.body;
    const result = await Order.modifyOrderReviewStatus(order_id, product_id);
    res.status(200).send({ data: result });
}

module.exports = {
    checkout,
    getUserPayments,
    getUserPaymentsGroupByDB,

    // chiu
    getPaidOrders,
    modifyOrderReviewStatus
};
