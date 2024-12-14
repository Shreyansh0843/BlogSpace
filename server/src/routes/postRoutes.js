const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    createPost,
    getPosts,
    getStarredPosts,
    toggleStar,
    deletePost
} = require('../controllers/postController');

router.use(protect);

router.route('/')
    .get(getPosts)
    .post(createPost);

router.get('/starred', getStarredPosts);
router.put('/:id/star', toggleStar);
router.delete('/:id', deletePost);

module.exports = router;