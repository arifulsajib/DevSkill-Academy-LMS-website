import * as yup from "yup";

export const resetpassSchema = yup.object().shape({
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters").matches(/[0-9]/, "Password must contain at least one digit").matches(/[a-z]/, "Password must contain at least one lowercase letter"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match")
});
