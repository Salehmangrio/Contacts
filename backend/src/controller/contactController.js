import contactServices from "../services/contactServices.js";

/**
 * GET CONTACTS
 */
export const getContacts = async (req, res) => {
    try {
        const userId = req.user._id;

        const contacts = await contactServices.getContact({ userId });

        res.status(200).json({
            success: true,
            data: contacts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to get contacts",
        });
    }
};

/**
 * ADD CONTACT
 */
export const addContact = async (req, res) => {
    try {
        const userId = req.user._id;

        const contact = await contactServices.addContact({
            ...req.body,
            createdBy: userId,
        });

        res.status(201).json({
            success: true,
            message: "Contact added successfully",
            data: contact,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to add contact",
        });
    }
};

/**
 * UPDATE CONTACT
 */
export const updateContact = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params;

        const updatedContact = await contactServices.updateContact({
            _id: id,
            userId,
            ...req.body,
        });

        if (!updatedContact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found or not authorized",
            });
        }

        res.status(200).json({
            success: true,
            message: "Contact updated successfully",
            data: updatedContact,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to update contact",
        });
    }
};

/**
 * DELETE CONTACT
 */
export const deleteContact = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params;

        const result = await contactServices.deleteContact({
            _id: id,
            userId,
        });

        if (!result || result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Contact not found or not authorized",
            });
        }

        res.status(200).json({
            success: true,
            message: result.message || "Contact deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to delete contact",
        });
    }
};