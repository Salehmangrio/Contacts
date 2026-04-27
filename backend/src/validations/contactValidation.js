import * as Yup from "yup";

export const contactValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters")
    .required("Name is required"),

  profileUrl: Yup.string()
    .trim()
    .nullable()
    .notRequired()
    .test(
      "valid-url",
      "Profile URL must be a valid URL",
      (value) => {
        if (!value) return true; // allow empty
        return Yup.string().url().isValidSync(value);
      }
    ),

  contactNum: Yup.string()
    .matches(/^[0-9]+$/, "Contact number must contain only digits")
    .min(10, "Contact number must be at least 10 digits")
    .max(15, "Contact number must be at most 15 digits")
    .required("Contact number is required"),
});