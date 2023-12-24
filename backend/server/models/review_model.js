const {pool} = require('./mysqlcon');

const createReview = async (review) => {
    const [result] = await pool.query('INSERT INTO review SET ?', review);
    return result.insertId;
};

module.exports = {
    createReview,
};