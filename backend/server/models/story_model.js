require('dotenv').config();

const createStory = async (picUrl, purchaseUrl, createTime) => {
    const conn = await pool.getConnection();
    try {
        await conn.query('START TRANSACTION');
        const story = {
            picUrl: picUrl,
            purchase_url: purchaseUrl,
            create_time: createTime
        };
        const queryStr = 'INSERT INTO story SET ?';
        const [result] = await conn.query(queryStr, story);
        story.id = result.insertId;
        await conn.query('COMMIT');
        return {story};
    } catch (error) {
        console.log(error);
        await conn.query('ROLLBACK');
        return {error};
    } finally {
        await conn.release();
    }
}

const showStory = async () => {
    const conn = await pool.getConnection();
    try {
        await conn.query('START TRANSACTION');

        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);

        const [stories] = await conn.query('SELECT * FROM story WHERE create_time >= ?', [oneDayAgo]);

        await conn.query('COMMIT');
        return { stories };
    } catch (error) {
        console.log(error);
        await conn.query('ROLLBACK');
        return { error };
    } finally {
        await conn.release();
    }
}

module.exports = {
    createStory,
    showStory
};