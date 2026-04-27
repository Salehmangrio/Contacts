import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50
        },

        profileUrl: {
            type: String,
            default: "",
            trim: true
        },

        contactNum: {
            type: String,
            required: true,
            trim: true,
            minlength: 10,
            maxlength: 15,
            match: [/^[0-9]+$/, "Contact number must contain only digits"]
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Contact", contactSchema);