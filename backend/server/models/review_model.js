const { pool } = require('./mysqlcon');

const createReview = async (review) => {
    const conn = await pool.getConnection();
    const [result] = await conn.query('INSERT INTO review SET ?', review);
    conn.release();
    return result.insertId;
};

const getReviewsByProductId = async (product_id) => {
    const conn = await pool.getConnection();
    const [result] = await conn.query('SELECT * FROM review WHERE product_id = ? AND deleted = ?', [product_id, 0]);
    conn.release();
    return result;
};

const countEmojiByReviewId = async (review_id) => {
    const conn = await pool.getConnection();
    const query = `
        SELECT emoji, COUNT(*) AS emoji_count
        FROM review_emoji
        WHERE review_id = ? AND emoji IS NOT NULL
        AND emoji IN ('like', 'excited', 'love', 'dislike', 'angry', 'heartbroken')
        GROUP BY emoji
    `;
    const [result] = await conn.query(query, [review_id, 0]);
    conn.release();
    return result;
};

const getReviewById = async (review_id) => {
    const conn = await pool.getConnection();
    const [result] = await conn.query('SELECT * FROM review WHERE id = ?', [review_id]);
    conn.release();
    return result[0];
};

const getUserEmojiByReviewId = async (review_id, user_id) => {
    const conn = await pool.getConnection();
    const query = `
        SELECT emoji
        FROM review_emoji
        WHERE review_id = ? AND user_id = ?
    `;
    const [result] = await conn.query(query, [review_id, user_id]);
    conn.release();
    return result[0];
};

const createReviewEmoji = async (emoji) => {
    const conn = await pool.getConnection();
    const [result] = await conn.query('INSERT INTO review_emoji SET ?', emoji);
    conn.release();
    return result.insertId;
};

const updateReviewEmoji = async (review_id, user_id, emoji) => {
    const conn = await pool.getConnection();
    const query = `
        UPDATE review_emoji
        SET emoji = ?
        WHERE review_id = ? AND user_id = ?
    `;
    const [result] = await conn.query(query, [emoji, review_id, user_id]);
    conn.release();
    return result;
};

const softDeleteReview = async (review_id) => {
    const conn = await pool.getConnection();
    const [result] = await conn.query('UPDATE review SET deleted = ? WHERE id = ?', [1, review_id]);
    conn.release();
    return result;
};

module.exports = {
    createReview,
    getReviewsByProductId,
    countEmojiByReviewId,
    getUserEmojiByReviewId,
    createReviewEmoji,
    updateReviewEmoji,
    getReviewById,
    softDeleteReview,
};
