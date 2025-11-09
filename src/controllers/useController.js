import User from '../models/User.js';
import { userValidationSchema } from '../models/UserValidation.js';

// Criar um novo usuário
export const createUser = async (req, res) => {
  const { error } = userValidationSchema.validate(req.body);
  if (error) {
    return res
      .status(422)
      .json({ error: error.details.map((detail) => detail.message).join(', ') });
  }

  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar todos usuários
export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

//Listar um usuário por ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: `User not found` });
    }

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Listar usuários por ID
export const getUsersByIDs = async (req, res) => {
  try {
    const users = await User.find({ _id: { $in: req.body.ids } });
    if (users.length === 0) {
      return res.status(404).json({ error: `No users found` });
    }
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Listar usuário por username
export const getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      return res.status(404).json({ error: `User not found` });
    }

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//PUT -> atualizar usuário já existente
export const updateUserByID = async (req, res) => {
  const { error } = userValidationSchema.validate(req.body, { presence: 'optional' });
  if (error) {
    return res
      .status(422)
      .json({ error: error.details.map((detail) => detail.message).join(', ') });
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!user) {
      req.status(404).json({ error: `User not found` });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Adicionar ID de amigo ao usuário
export const addFriend = async (req, res) => {
  const { error } = userValidationSchema.validate(req.body);
  if (error) {
    return res
      .status(422)
      .json({ error: error.details.map((detail) => detail.message).join(', ') });
  }
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const friend = await User.getUserByUsername(req.body.username);
    if (!friend) return res.status(404).json({ error: 'Friend not found' });

    if (user.friends.includes(friend._id)) {
      return res.status(409).json({ error: 'Friend already added' });
    }

    user.friends.push(friend._id);
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//DELETE usuário por ID
export const deleteUserByID = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
