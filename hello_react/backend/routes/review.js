const express = require('express');
const router = express.Router();
const controller = require('../controllers/reviewController');

router.get('/top-liked', controller.getTopLikedReviews);
router.post('/', controller.addReview);
router.get('/:id', controller.getReviewById);
router.put('/:id', controller.updateReview);
router.delete('/:id', controller.deleteReview);
router.get('/', controller.getReviews);
router.post('/like/toggle', controller.toggleLike);

module.exports = router;
