jest.mock("../src/config/firebaseConfig", () => ({
    db: {}
}));

jest.mock("firebase/firestore", () => ({
    collection: jest.fn(),
    addDoc: jest.fn().mockResolvedValue({ id: "test-id-123" }),
    getDocs: jest.fn().mockResolvedValue({ docs: [] }),
    getDoc: jest.fn().mockResolvedValue({ exists: () => false }),
    doc: jest.fn(),
    updateDoc: jest.fn(),
    deleteDoc: jest.fn(),
}));

import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from "../src/controllers/eventController";

const mockRequest = (body = {}, params = {}) => ({ body, params }) as any;
const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe("Event Service", () => {
    it("should create an event successfully", async () => {
        const req = mockRequest({ name: "Test Event", date: "2027-12-25T09:00:00.000Z", capacity: 100 });
        const res = mockResponse();
        await createEvent(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
    });

    it("should get all events", async () => {
        const req = mockRequest();
        const res = mockResponse();
        await getAllEvents(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should return 404 for non-existent event", async () => {
        const req = mockRequest({}, { id: "nonexistentid123" });
        const res = mockResponse();
        await getEventById(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
    });

    it("should return 404 when updating non-existent event", async () => {
        const req = mockRequest({ name: "Updated" }, { id: "nonexistentid123" });
        const res = mockResponse();
        await updateEvent(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
    });

    it("should return 404 when deleting non-existent event", async () => {
        const req = mockRequest({}, { id: "nonexistentid123" });
        const res = mockResponse();
        await deleteEvent(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
    });
});