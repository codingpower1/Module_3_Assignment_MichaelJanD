import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const createEventSchema = Joi.object({
    name: Joi.string().required(),
    date: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().optional(),
});

export const validateCreateEvent = (req: Request, res: Response, next: NextFunction) => {
    const { error } = createEventSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};