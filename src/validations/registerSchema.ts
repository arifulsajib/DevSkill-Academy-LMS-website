import * as yup from "yup";

export const registerSchema = yup.object().shape({
  name: yup.string().required("Name is required").max(30, "Name must be at most 30 characters"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters").matches(/[0-9]/, "Password must contain at least one digit").matches(/[a-z]/, "Password must contain at least one lowercase letter")
});
