import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const registerUser = async (data) => {
    try {
        const { name, email, password } = data;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new Error("User already exists");
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return user;

    } catch (error) {
        throw error;
    }
};

const loginUser = async (data) => {
    try {
        const { email, password } = data;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            throw new Error("User does not exist");
        }


        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            throw new Error("Invalid password");
        }

        return existingUser;

    } catch (error) {
        throw error;
    }
};

export default { loginUser, registerUser };