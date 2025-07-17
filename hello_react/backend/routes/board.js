// backend/routes/board.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/boardController');
const { authenticateToken } = require('../middleware/auth');

router.get('/top-liked', controller.getTopLikedBoards); // 상위 5개 게시글 가져오기
router.get('/search', controller.searchBoards); // 검색 기능 추가
router.get('/', controller.getBoards);
router.get('/:id', controller.getBoardById);
router.post('/', authenticateToken, controller.createBoard);
router.put('/:id', authenticateToken, controller.updateBoard);   
router.delete('/:id', authenticateToken, controller.deleteBoard); 
router.post('/:id/like', authenticateToken, controller.toggleLike); 
router.get('/:id/likes', controller.getLikesCount);

module.exports = router;
