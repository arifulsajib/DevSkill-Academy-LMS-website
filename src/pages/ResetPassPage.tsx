import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../Redux/hooks/hook";
import { useResetPasswordMutation } from "../Redux/features/api/authApiSlice";
import { toggleLoginModal } from "../Redux/features/toggle/modalSlice";
import { selectCurrentUser } from "../Redux/features/auth/usersSlice";
import { FormikProps, useFormik } from "formik";
import { resetpassSchema } from "../validations/resetpassSchema";

interface InitialValues {
  password: string;
  confirmPassword: string;
  serverError?: string;
}

const ResetPassPage = () => {
  const { userId, resetString } = useParams();
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

  // get redux state
  const dispatch = useAppDispatch();

  // Form submit
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  //   const location = useLocation();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const onSubmit = async (values: InitialValues, actions: any) => {
    try {
      const result = await resetPassword({ newPassword: values.password, userId, resetString }).unwrap();
      actions.resetForm();
      navigate("/");
      if (!user || user === undefined) {
        dispatch(toggleLoginModal());
      }
      setErrors({ serverError: "" });
      notify(result.message);
    } catch (error: any) {
      setErrors({ serverError: "Reset Link Invalid or Expired." });
      notify("Reset Link Invalid or Expired.");
    }
  };

  // formik validation
  const { values, errors, setErrors, touched, isSubmitting, handleSubmit, handleChange, handleBlur }: FormikProps<InitialValues> = useFormik<InitialValues>({
    initialValues: {
      password: "",
      confirmPassword: ""
    },
    validationSchema: resetpassSchema,
    onSubmit: onSubmit
  });

  return (
    <section className="px-2 md:px-4 min-h-screen">
      <h1 className="text-2xl font-bold mt-2 text-center">Reset Password</h1>
      <div className="flex justify-center">
        <form className="my-6" onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2 mt-5">
            <i className="fa-solid fa-key opacity-70"></i>
            <input name="password" type={showPassword ? "text" : "password"} className="grow overflow-hidden" placeholder="Enter New Password" value={values.password} onChange={handleChange} onBlur={handleBlur} />

            {showPassword ? <i className="fa-solid fa-eye opacity-70" onClick={() => setShowPassword(!showPassword)}></i> : <i className="fa-solid fa-eye-slash opacity-70" onClick={() => setShowPassword(!showPassword)}></i>}
          </label>
          {errors.password && touched.password && <p className="text-red-600">{errors.password}</p>}

          <label className="input input-bordered flex items-center gap-2 mt-5">
            <i className="fa-solid fa-key opacity-70"></i>
            <input name="confirmPassword" type={showPassword ? "text" : "password"} className="grow overflow-hidden" placeholder="Confirm New Password" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} />

            {showPassword ? <i className="fa-solid fa-eye opacity-70" onClick={() => setShowPassword(!showPassword)}></i> : <i className="fa-solid fa-eye-slash opacity-70" onClick={() => setShowPassword(!showPassword)}></i>}
          </label>
          {errors.confirmPassword && touched.confirmPassword && <p className="text-red-600">{errors.confirmPassword}</p>}

          {errors.serverError && <p className="text-red-600 mt-2">{errors.serverError}</p>}
          <button className="btn btn-primary w-full mt-5" type="submit" disabled={isSubmitting || isLoading}>
            {isLoading ? <span className="loading loading-spinner loading-sm"></span> : "Reset Password"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassPage;
