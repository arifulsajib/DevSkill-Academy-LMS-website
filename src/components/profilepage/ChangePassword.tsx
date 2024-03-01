import { Bounce, toast } from "react-toastify";
import { useUpdatePasswordMutation } from "../../Redux/features/api/usersApiSlice";
import { FormikProps, useFormik } from "formik";
import { changepassSchema } from "../../validations/changepassSchema";
import { useState } from "react";

interface InitialValues {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword?: string;
  serverError?: string;
}

const ChangePassword = () => {
  //   toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // toastify function
  const notify = (textToShow: string) => {
    toast(textToShow, {
      position: "top-right",
      autoClose: 4000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      transition: Bounce
    });
  };

  // Form submit function
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const onSubmit = async (values: InitialValues, actions: any) => {
    try {
      await updatePassword({ ...values }).unwrap();
      actions.resetForm();
      setErrors({ serverError: "" });
      notify("Password updated successfully");
    } catch (error: any) {
      setErrors({ serverError: error?.data?.message });
      notify(error?.data?.message);
    }
  };

  // formik validation
  const { values, errors, setErrors, touched, isSubmitting, handleSubmit, handleChange, handleBlur }: FormikProps<InitialValues> = useFormik<InitialValues>({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    },
    validationSchema: changepassSchema,
    onSubmit: onSubmit
  });
  console.log(values);
  return (
    <div className="lg:w-7/12 mx-auto">
      <h1 className="text-2xl font-bold text-center">Change Password</h1>
      <form onSubmit={handleSubmit}>
        {/* current password */}
        <label className="input input-bordered flex items-center gap-2 mt-5">
          <i className="fa-solid fa-key opacity-70"></i>
          <input name="currentPassword" type={showPassword ? "text" : "password"} className="grow overflow-hidden" placeholder="Enter Current Password" value={values.currentPassword} onChange={handleChange} onBlur={handleBlur} />

          {showPassword ? <i className="fa-solid fa-eye opacity-70" onClick={() => setShowPassword(!showPassword)}></i> : <i className="fa-solid fa-eye-slash opacity-70" onClick={() => setShowPassword(!showPassword)}></i>}
        </label>
        {errors.currentPassword && touched.currentPassword && <p className="text-red-600">{errors.currentPassword}</p>}
        {/* new password */}
        <label className="input input-bordered flex items-center gap-2 mt-5">
          <i className="fa-solid fa-key opacity-70"></i>
          <input name="newPassword" type={showPassword ? "text" : "password"} className="grow overflow-hidden" placeholder="Enter Current Password" value={values.newPassword} onChange={handleChange} onBlur={handleBlur} />

          {showPassword ? <i className="fa-solid fa-eye opacity-70" onClick={() => setShowPassword(!showPassword)}></i> : <i className="fa-solid fa-eye-slash opacity-70" onClick={() => setShowPassword(!showPassword)}></i>}
        </label>
        {errors.newPassword && touched.newPassword && <p className="text-red-600">{errors.newPassword}</p>}
        {/* confirm new password */}
        <label className="input input-bordered flex items-center gap-2 mt-5">
          <i className="fa-solid fa-key opacity-70"></i>
          <input name="confirmNewPassword" type={showPassword ? "text" : "password"} className="grow overflow-hidden" placeholder="Enter Current Password" value={values.confirmNewPassword} onChange={handleChange} onBlur={handleBlur} />

          {showPassword ? <i className="fa-solid fa-eye opacity-70" onClick={() => setShowPassword(!showPassword)}></i> : <i className="fa-solid fa-eye-slash opacity-70" onClick={() => setShowPassword(!showPassword)}></i>}
        </label>
        {errors.confirmNewPassword && touched.confirmNewPassword && <p className="text-red-600">{errors.confirmNewPassword}</p>}
        {/* submit */}
        <button type="submit" className="btn btn-secondary w-full mt-5" disabled={isSubmitting || isLoading}>
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
