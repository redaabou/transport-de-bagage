import Joi from 'joi';

export const createOfferSchema = Joi.object({
  date: Joi.date().iso().required(),
  fromLocation: Joi.string().required(),
  toLocation: Joi.string().required(),
  transportId: Joi.number().integer().positive().required()
});

export const updateOfferSchema = Joi.object({
  date: Joi.date().iso().optional(),
  fromLocation: Joi.string().optional(),
  toLocation: Joi.string().optional(),
  status: Joi.string().valid('PENDING', 'ACCEPTED', 'REJECTED').optional()
});