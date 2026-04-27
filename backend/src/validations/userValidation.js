import * as Yup from "yup";

const email = Yup.string().trim()
    .email("Invalid email format")
    .required("Email is required");

const password = Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required");

export const registerValidation = Yup.object(
    {
        name: Yup.string().trim()
            .required("Name is required")
            .min(5, "Name must be at least 5 characters"),
        email,
        password,
    }
);

export const loginValidation = Yup.object({
    email,
    password
})
