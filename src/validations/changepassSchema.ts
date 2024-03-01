import * as yup from "yup";

export const changepassSchema = yup.object().shape({
  currentPassword: yup.string().required("Current Password is required"),
  newPassword: yup.string().required("New Password is required").min(6, "Password must be at least 6 characters").matches(/[0-9]/, "Password must contain at least one digit").matches(/[a-z]/, "Password must contain at least one lowercase letter"),
  confirmNewPassword: yup
    .string()
    .required("Confirm New Password is required")
    .oneOf([yup.ref("newPassword")], "Passwords must match")
});
