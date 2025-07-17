const express = require('express');
const router = express.Router();
const controller = require('../controllers/memberController');
const { authenticateToken } = require('../middleware/auth');

router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.get('/me', authenticateToken, controller.getMyInfo);
router.get('/:id', controller.getMember);
router.put('/:id', controller.updateMember);
router.delete('/:id', controller.deleteMember);

module.exports = router;
