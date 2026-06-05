import Joi from 'joi';

const createEventSchema = Joi.object({
    name: Joi.string().min(3).required(),
    date: Joi.date().iso().greater("now").required(),
    capacity: Joi.number().integer().min(5).required(),
    registrationCount: Joi.number().integer().max(Joi.ref("capacity")).default(0),
    status: Joi.string().valid("active", "cancelled", "completed").default("active"),
    category: Joi.string().valid("conference", "workshop", "meetup", "seminar", "general").default("general"),
});

describe("Create Event Validation", () => {
    test("should pass with valid required fields only", () => {
        const { error } = createEventSchema.validate({
            name: "Tech Conference",
            date: "2027-12-25T09:00:00.000Z",
            capacity: 100,
        });
        expect(error).toBeUndefined();
    });

    test("should fail when name is less than 3 characters", () => {
        const { error } = createEventSchema.validate({
            name: "AB",
            date: "2027-12-25T09:00:00.000Z",
            capacity: 100,
        });
        expect(error?.details[0].message).toContain("length must be at least 3 characters");
    });

    test("should fail when capacity is less than 5", () => {
        const { error } = createEventSchema.validate({
            name: "Test Event",
            date: "2027-12-25T09:00:00.000Z",
            capacity: 4,
        });
        expect(error?.details[0].message).toContain("must be greater than or equal to 5");
    });

    test("should fail when registrationCount exceeds capacity", () => {
        const { error } = createEventSchema.validate({
            name: "Test Event",
            date: "2027-12-25T09:00:00.000Z",
            capacity: 100,
            registrationCount: 150,
        });
        expect(error?.details[0].message).toContain("must be less than or equal to ref:capacity");
    });

    test("should fail when status is not a valid enum", () => {
        const { error } = createEventSchema.validate({
            name: "Test Event",
            date: "2027-12-25T09:00:00.000Z",
            capacity: 100,
            status: "pending",
        });
        expect(error?.details[0].message).toContain("must be one of");
    });

    test("should apply defaults when optional fields are omitted", () => {
        const { value } = createEventSchema.validate({
            name: "Test Event",
            date: "2027-12-25T09:00:00.000Z",
            capacity: 100,
        });
        expect(value.status).toBe("active");
        expect(value.category).toBe("general");
        expect(value.registrationCount).toBe(0);
    });
});