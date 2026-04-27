import Contact from "../models/contactModel.js";

/**
 * GET CONTACTS
 */
const getContact = async ({ userId }) => {
    if (!userId) throw new Error("User ID is required");

    return await Contact.find({ createdBy: userId }).sort({ name: 1 });
};

/**
 * ADD CONTACT
 */
const addContact = async (data) => {
    const { name, contactNum, createdBy } = data;

    if (!name || !contactNum || !createdBy) {
        throw new Error("Name, Contact Number, and User ID are required");
    }

    const existingContact = await Contact.findOne({
        createdBy,
        contactNum,
    });

    if (existingContact) {
        throw new Error("Contact with this number already exists");
    }

    const contact = new Contact(data);
    return await contact.save();
};
/**
 * UPDATE CONTACT
 */
const updateContact = async ({ _id, userId, ...data }) => {
    if (!_id || !userId) throw new Error("Invalid request");

    const updated = await Contact.findOneAndUpdate(
        { _id, createdBy: userId },
        data,
        { new: true }
    );

    if (!updated) throw new Error("Contact not found");

    return updated;
};

/**
 * DELETE CONTACT
 */
const deleteContact = async ({ _id, userId }) => {
    if (!_id || !userId) throw new Error("Invalid request");

    const deleted = await Contact.findOneAndDelete({
        _id,
        createdBy: userId,
    });

    if (!deleted) throw new Error("Contact not found");

    return { message: "Contact deleted successfully" };
};

export default {
    getContact,
    addContact,
    updateContact,
    deleteContact,
};