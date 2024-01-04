const { pool } = require('./mysqlcon');

const createCampaign = async (campaign) => {
    const conn = await pool.getConnection();
    const [result] = await conn.query('INSERT INTO campaign SET ?', campaign);
    conn.release();
    return result.insertId;
};

const createHot = async (title, productIds) => {
    const conn = await pool.getConnection();
    try {
        await conn.query('START TRANSACTION');
        const [hot] = await conn.query('INSERT INTO hot SET ?', { title });
        const hotId = hot.insertId;
        const hotProductMapping = productIds.map((productId) => [hotId, productId]);
        await conn.query('INSERT INTO hot_product(hot_id, product_id) VALUES ?', [hotProductMapping]);
        await conn.query('COMMIT');
        conn.release();
        return true;
    } catch (e) {
        await conn.query('ROLLBACK');
        return false;
    }
};

const getCampaigns = async () => {
    const conn = await pool.getConnection();
    const [campaigns] = await conn.query('SELECT * FROM campaign', []);
    conn.release();
    return campaigns;
};

const getHots = async () => {
    const conn = await pool.getConnection();
    const [hots] = await conn.query('SELECT * FROM hot', []);
    conn.release();
    return hots;
};

module.exports = {
    createCampaign,
    createHot,
    getCampaigns,
    getHots,
};
