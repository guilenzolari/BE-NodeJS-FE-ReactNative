import Joi from 'joi';
import { allUFs } from './allUFs.js';

export const userValidationSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(1).required(),
  username: Joi.string().min(3).trim().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\d{10,11}$/)
    .required(),
  age: Joi.number().min(0).required(),
  uf: Joi.string()
    .valid(...allUFs)
    .required(),
  password: Joi.string().min(6).required(),
  friends: Joi.array().items(Joi.string()).default([]),
  shareInfoWithFriends: Joi.boolean().default(true),
  shareInfoWithStranges: Joi.boolean().default(false),
});
