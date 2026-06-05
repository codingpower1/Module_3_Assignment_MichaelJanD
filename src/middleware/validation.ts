import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const createEventSchema = Joi.object({
    name: Joi.string().min(3).required(),
    date: Joi.date().iso().greater("now").required(),
    capacity: Joi.number().integer().min(5).required(),
    registrationCount: Joi.number().integer().max(Joi.ref("capacity")).default(0),
    status: Joi.string().valid("active", "cancelled", "completed").default("active"),
    category: Joi.string().valid("conference", "workshop", "meetup", "seminar", "general").default("general"),
});

export const validateCreateEvent = (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = createEventSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: `Validation error: ${error.details[0].message}` });
    }
    req.body = value; // applies defaults
    next();
};