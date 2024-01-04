const {pool} = require('./mysqlcon');

const createReview = async (review) => {
    const [result] = await pool.query('INSERT INTO review SET ?', review);
    return result.insertId;
};

const getReviewsByProductId = async (product_id) => {
    const [result] = await pool.query('SELECT * FROM review WHERE product_id = ? AND deleted = ?', [product_id, 0]);
    return result;
};

const countEmojiByReviewId = async (review_id) => {
    const query = `
        SELECT emoji, COUNT(*) AS emoji_count
        FROM review_emoji
        WHERE review_id = ? AND emoji IS NOT NULL
        AND emoji IN ('like', 'excited', 'love', 'dislike', 'angry', 'heartbroken')
        GROUP BY emoji
    `;
    const [result] = await pool.query(query, [review_id, 0]);
    return result;
};

const getReviewById = async (review_id) => {
    const [result] = await pool.query('SELECT * FROM review WHERE id = ?', [review_id]);
    return result[0];
}

const getUserEmojiByReviewId = async (review_id, user_id) => {
    const query = `
        SELECT emoji
        FROM review_emoji
        WHERE review_id = ? AND user_id = ?
    `;
    const [result] = await pool.query(query, [review_id, user_id]);
    return result[0];
};

const createReviewEmoji = async (emoji) => {
    const [result] = await pool.query('INSERT INTO review_emoji SET ?', emoji);
    return result.insertId;
};

const updateReviewEmoji = async (review_id, user_id, emoji) => {
    const query = `
        UPDATE review_emoji
        SET emoji = ?
        WHERE review_id = ? AND user_id = ?
    `;
    const [result] = await pool.query(query, [emoji, review_id, user_id]);
    return result;
};

const softDeleteReview = async (review_id) => {
    const [result] = await pool.query('UPDATE review SET deleted = ? WHERE id = ?', [1, review_id]);
    return result;
}

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