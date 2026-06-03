import { Request, Response } from "express";
import { db } from "../config/firebaseConfig";
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, DocumentReference } from "firebase/firestore";

export const createEvent = async (req: Request, res: Response) => {
    try {
        const event = req.body;
        const ref = await addDoc(collection(db, "events"), event);
        res.status(201).json({ id: ref.id, ...event });
    } catch (error) {
        res.status(500).json({ error: "Failed to create event" });
    }
};

export const getAllEvents = async (req: Request, res: Response) => {
    try {
        const snapshot = await getDocs(collection(db, "events"));
        const events = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: "Failed to get events" });
    }
};

export const getEventById = async (req: Request, res: Response) => {
    try {
        const ref = docRef(db, "events", req.params.id);
        const snap = await getDoc(ref);
        if (!snap.exists()) return res.status(404).json({ error: "Event not found" });
        res.status(200).json({ id: snap.id, ...snap.data() });
    } catch (error) {
        res.status(500).json({ error: "Failed to get event" });
    }
};

export const updateEvent = async (req: Request, res: Response) => {
    try {
        const ref = docRef(db, "events", req.params.id);
        const snap = await getDoc(ref);
        if (!snap.exists()) return res.status(404).json({ error: "Event not found" });
        await updateDoc(ref, req.body);
        res.status(200).json({ id: req.params.id, ...req.body });
    } catch (error) {
        res.status(500).json({ error: "Failed to update event" });
    }
};

export const deleteEvent = async (req: Request, res: Response) => {
    try {
        const ref = docRef(db, "events", req.params.id);
        const snap = await getDoc(ref);
        if (!snap.exists()) return res.status(404).json({ error: "Event not found" });
        await deleteDoc(ref);
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete event" });
    }
};