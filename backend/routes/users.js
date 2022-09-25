const router = require('express').Router();
const {
  getUsers,
  getCurrentUser,
  getUserId,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');
const {
  validateObjId,
  validateAvatar,
  validatePofile,
} = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/:id', validateObjId, getUserId);
router.get('/me', getCurrentUser);
router.patch('/me', validatePofile, updateUserInfo);
router.patch('/me/avatar', validateAvatar, updateUserAvatar);

module.exports = router;
