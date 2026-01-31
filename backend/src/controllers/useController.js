import User from '../models/User.js';
import { userValidationSchema } from '../models/UserValidation.js';
import { AppError } from '../erros/AppErrors.js';
import mongoose from 'mongoose';

// Criar um novo usuário
export const createUser = async (req, res) => {
  const { error } = userValidationSchema.validate(req.body);
  if (error) {
    throw new AppError(error.details.map((detail) => detail.message).join(', '), 422);
  }

  const user = await User.create(req.body);
  res.status(201).json(user);
};

// Listar todos usuários
export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

//Listar um usuário por ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid ID format', 400);
  }

  const user = await User.findById(id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.json(user);
};

//Listar usuários por ID
export const getUsersByIDs = async (req, res) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    throw new AppError('IDs array is required', 400);
  }

  const users = await User.find({ _id: { $in: ids } });

  if (users.length === 0) {
    throw new AppError('No users found', 404);
  }
  res.json(users);
};

//Listar usuário por username
export const getUserByUsername = async (req, res) => {
  const user = await User.findOne({ username: req.params.username });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.json(user);
};

//Adicionar amigo usando IDs /
export const addFriendById = async (req, res) => {
  const { friendId } = req.body;
  const userId = req.params.id;

  if (userId === friendId) {
    throw new AppError('Cannot add yourself as a friend', 400);
  }

  // Executamos os updates de forma atômica
  // O { new: true } faz o Mongoose retornar o documento JÁ atualizado
  const [updatedUser, updatedFriend] = await Promise.all([
    User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true, runValidators: true }
    ),
    User.findByIdAndUpdate(
      friendId,
      { $addToSet: { friends: userId } },
      { new: true, runValidators: true }
    ),
  ]);

  if (!updatedUser || !updatedFriend) {
    throw new AppError('User or Friend not found', 404);
  }

  res.status(200).json({
    message: 'Friend added successfully',
    user: updatedUser,
  });
};

//PUT -> atualizar usuário já existente
export const updateUserByID = async (req, res) => {
  const { error } = userValidationSchema.validate(req.body, { presence: 'optional' });
  if (error) {
    throw new AppError(error.details.map((detail) => detail.message).join(', '), 422);
  }
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!user) {
    throw new AppError('User not found', 404);
  }
  res.json(user);
};

//DELETE usuário por ID
export const deleteUserByID = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  res.json(user);
};

//Listar amigos de um usuário
export const getFriends = async (req, res) => {
  const user = await User.findById(req.params.id).populate('friends');
  if (!user) throw new AppError('User not found', 404);

  res.json(user.friends);
};
