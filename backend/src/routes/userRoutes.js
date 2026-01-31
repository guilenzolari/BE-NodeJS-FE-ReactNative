import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  getUsersByIDs,
  updateUserByID,
  deleteUserByID,
  getUserByUsername,
  getFriends,
  addFriendById,
} from '../controllers/useController.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/batch', getUsersByIDs);
router.get('/username/:username', getUserByUsername);
router.put('/:id', updateUserByID);
router.delete('/:id', deleteUserByID);
router.get('/:id/friends', getFriends);
router.post('/:id/add-friend', addFriendById);

export default router;
