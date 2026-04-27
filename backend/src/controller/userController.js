import userServices from "../services/userServices.js";
import generateToken from "../utils/token.js";

const sendUserResponse = (user, token) => {
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        token
    };
};

export const registerUser = async (req, res) => {
    try {
        const user = await userServices.registerUser(req.body);

        const token = generateToken({
            _id: user._id,
            email: user.email
        });

        res.status(201).json({
            message: "User successfully registered.",
            data: sendUserResponse(user, token)
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || "User could not register. Try Again."
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const user = await userServices.loginUser(req.body);

        const token = generateToken({
            _id: user._id,
            email: user.email
        });

        res.status(200).json({
            message: "User successfully logged in.",
            data: sendUserResponse(user, token)
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || "User could not login. Try Again."
        });
    }
};