import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

import {
    getContacts,
    addContact,
    updateContact,
    deleteContact,
} from "../controller/contactController.js";

const router = express.Router();

/**
 * GET all contacts of logged-in user
 * req.user.id is used internally
 */
router.get("/", authMiddleware, getContacts);

/**
 * CREATE contact
 */
router.post("/", authMiddleware, addContact);

/**
 * UPDATE contact by ID
 */
router.put("/:id", authMiddleware, updateContact);

/**
 * DELETE contact by ID
 */
router.delete("/:id", authMiddleware, deleteContact);

export default router;