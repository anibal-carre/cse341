const { getContactsCollection } = require("../data/database");
const { ObjectId } = require("mongodb");

const validateContact = (data) => {
    const { firstName, lastName, email, favoriteColor, birthday } = data || {};
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) return false;
    return true;
};

const getAllContacts = async (req, res) => {
    try {
        const collection = getContactsCollection();
        const contacts = await collection.find({}).toArray();
        return res.status(200).json(contacts);
    } catch (err) {
        console.error("getAllContacts error:", err);
        return res.status(500).json({ message: "Error fetching contacts", error: err.message });
    }
};

const getContactById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid id format" });

        const collection = getContactsCollection();
        const contact = await collection.findOne({ _id: new ObjectId(id) });

        if (!contact) return res.status(404).json({ message: "Contact not found" });
        return res.status(200).json(contact);
    } catch (err) {
        console.error("getContactById error:", err);
        return res.status(500).json({ message: "Error fetching contact", error: err.message });
    }
};

const createContact = async (req, res) => {
    try {
        const payload = req.body;
        if (!validateContact(payload)) {
            return res.status(400).json({ message: "All fields are required: firstName, lastName, email, favoriteColor, birthday" });
        }

        const collection = getContactsCollection();

        const newDoc = {
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            favoriteColor: payload.favoriteColor,
            birthday: payload.birthday,
        };

        const result = await collection.insertOne(newDoc);

        return res.status(201).json({ insertedId: result.insertedId });
    } catch (err) {
        console.error("createContact error:", err);
        return res.status(500).json({ message: "Error creating contact", error: err.message });
    }
};

const updateContact = async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid id format" });

        const payload = req.body;
        if (!validateContact(payload)) {
            return res.status(400).json({ message: "All fields are required: firstName, lastName, email, favoriteColor, birthday" });
        }

        const collection = getContactsCollection();

        const updateResult = await collection.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    email: payload.email,
                    favoriteColor: payload.favoriteColor,
                    birthday: payload.birthday,
                }
            }
        );

        if (updateResult.matchedCount === 0) {
            return res.status(404).json({ message: "Contact not found" });
        }


        return res.status(204).send();
    } catch (err) {
        console.error("updateContact error:", err);
        return res.status(500).json({ message: "Error updating contact", error: err.message });
    }
};

const deleteContact = async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid id format" });

        const collection = getContactsCollection();

        const deleteResult = await collection.deleteOne({ _id: new ObjectId(id) });

        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ message: "Contact not found" });
        }

        return res.status(204).send();
    } catch (err) {
        console.error("deleteContact error:", err);
        return res.status(500).json({ message: "Error deleting contact", error: err.message });
    }
};

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
};
