const router = require('express').Router();
const { celebrate } = require('celebrate');
const { getUserInfo, updateUserInfo } = require('../controllers/users');
const { updateUserInfoJoi } = require('../utils/joiValidatorTemplates');

router.get('/me', getUserInfo);
router.patch('/me', celebrate(updateUserInfoJoi), updateUserInfo);

module.exports = router;
