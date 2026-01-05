import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  getUsersByIDs,
  updateUserByID,
  deleteUserByID,
  getUserByUsername,
  addFriend,
  getFriends,
} from '../controllers/useController.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/batch', getUsersByIDs);
router.get('/username/:username', getUserByUsername);
router.put('/:id', updateUserByID);
router.delete('/:id', deleteUserByID);
router.post('/:id/friend', addFriend);
router.get('/:id/friends', getFriends);

export default router;
