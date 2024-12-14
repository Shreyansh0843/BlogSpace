const Post = require('../models/Post');

// Create a new post
exports.createPost = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const post = await Post.create({
            title,
            content,
            tags,
            author: req.user._id
        });
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all posts for a user
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find({ author: req.user._id })
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get starred posts
exports.getStarredPosts = async (req, res) => {
    try {
        const posts = await Post.find({ 
            author: req.user._id,
            isStarred: true 
        }).sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Toggle star status
exports.toggleStar = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        post.isStarred = !post.isStarred;
        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete post
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};