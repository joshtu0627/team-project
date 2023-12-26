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
}

const getUserEmojiByReviewId = async (review_id, user_id) => {
    const query = `
        SELECT emoji
        FROM review_emoji
        WHERE review_id = ? AND user_id = ?
    `;
    const [result] = await pool.query(query, [review_id, user_id]);
    if (result.length === 0) return null;
    return result[0];
}

module.exports = {
    createReview,
    getReviewsByProductId,
    countEmojiByReviewId,
    getUserEmojiByReviewId,
};