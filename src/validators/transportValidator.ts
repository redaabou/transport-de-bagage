import Joi from 'joi';

export const createTransportSchema = Joi.object({
  city: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().valid('AVAILABLE', 'UNAVAILABLE').required(),
  pricePerKm: Joi.number().positive().required(),
  image: Joi.string().optional()
});

export const updateTransportSchema = Joi.object({
  city: Joi.string().optional(),
  description: Joi.string().optional(),
  status: Joi.string().valid('AVAILABLE', 'UNAVAILABLE').optional(),
  pricePerKm: Joi.number().positive().optional(),
  image: Joi.string().optional()
});
