require('dotenv').config();
const Story = require('../models/story_model');

const createStory = async (req, res) => {
    const { picUrl, purchaseUrl, createTime } = req.body;
    const { story, error } = await Story.createStory(picUrl, purchaseUrl, createTime);
    if (error) {
        return res.status(400).json({ error });
    }
    return res.status(200).json(story);
};

const showStory = async (req, res) => {
    const { stories, error } = await Story.showStory();
    if (error) {
        return res.status(400).json({ error });
    }
    return res.status(200).json(stories);
}

module.exports = {
    createStory,
    showStory
};