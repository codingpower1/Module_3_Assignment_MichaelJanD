import { Request, Response } from "express";
import { db } from "../config/firebaseConfig";
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

export const createEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const event = req.body;
        const ref = await addDoc(collection(db, "events"), event);
        res.status(201).json({ id: ref.id, ...event });
    } catch (error) {
        res.status(500).json({ error: "Failed to create event" });
    }
};

export const getAllEvents = async (req: Request, res: Response): Promise<void> => {
    try {
        const snapshot = await getDocs(collection(db, "events"));
        const events = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: "Failed to get events" });
    }
};

export const getEventById = async (req: Request, res: Response): Promise<void> => {
    try {
        const snap = await getDoc(doc(db, "events", String(req.params.id)));
        if (!snap.exists()) { res.status(404).json({ error: "Event not found" }); return; }
        res.status(200).json({ id: snap.id, ...snap.data() as object });
    } catch (error) {
        res.status(500).json({ error: "Failed to get event" });
    }
};

export const updateEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const snap = await getDoc(doc(db, "events", String(req.params.id)));
        if (!snap.exists()) { res.status(404).json({ error: "Event not found" }); return; }
        await updateDoc(doc(db, "events", String(req.params.id)), req.body);
        res.status(200).json({ id: req.params.id, ...req.body });
    } catch (error) {
        res.status(500).json({ error: "Failed to update event" });
    }
};

export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const snap = await getDoc(doc(db, "events", String(req.params.id)));
        if (!snap.exists()) { res.status(404).json({ error: "Event not found" }); return; }
        await deleteDoc(doc(db, "events", String(req.params.id)));
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete event" });
    }
};