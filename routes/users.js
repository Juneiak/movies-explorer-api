const router = require('express').Router();
const { getUserInfo, updateUserinfo } = require('../controllers/users');

router.get('/me', getUserInfo);
router.patch('/me', updateUserinfo);

module.exports = router;
