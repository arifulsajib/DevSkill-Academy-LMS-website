import cn from "classnames";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks/hook";
import { getLoginOpen, toggleLoginModal, toggleRegisterModal } from "../../Redux/features/toggle/modalSlice";
import { useState } from "react";
import { FormikProps, useFormik } from "formik";
import { loginSchema } from "../../validations/loginSchema";
import { useLoginMutation } from "../../Redux/features/api/authApiSlice";
import { setCredentials } from "../../Redux/features/auth/authSlice";
import { useLocation, useNavigate } from "react-router";
import { Bounce, toast } from "react-toastify";

interface Props {
  disableClickOutside?: boolean;
}

interface InitialValues {
  email: string;
  password: string;
  serverError?: string;
}

const LoginModal = ({ disableClickOutside }: Props) => {
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
  const openLogin = useAppSelector(getLoginOpen);

  // show modal is open is true
  const modalClass = cn({
    "modal modal-middle": true,
    "modal-open": openLogin
  });

  // Form submit
  const navigate = useNavigate();
  const location = useLocation();
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (values: InitialValues, actions: any) => {
    try {
      const userData = await login(values).unwrap();
      dispatch(setCredentials({ ...userData }));
      actions.resetForm();
      navigate(location?.state?.from || "/profile");
      dispatch(toggleLoginModal());
      setErrors({ serverError: "" });
      notify("Login Successful");
    } catch (error: any) {
      setErrors({ serverError: error?.data?.message });
      notify(error.data.message);
    }
  };

  // formik validation
  const { values, errors, setErrors, touched, isSubmitting, handleSubmit, handleChange, handleBlur }: FormikProps<InitialValues> = useFormik<InitialValues>({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: loginSchema,
    onSubmit: onSubmit
  });

  return (
    <div className={modalClass}>
      <div className="modal-box">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => {
            dispatch(toggleLoginModal());
          }}
        >
          ✕
        </button>

        <h3 className="text-lg font-bold text-center">Login to our system</h3>
        <form className="my-6" onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2">
            <i className="fa-solid fa-envelope opacity-70"></i>
            <input name="email" type="text" className="grow overflow-hidden" placeholder="Enter Your Email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
          </label>
          {errors.email && touched.email && <p className="text-red-600">{errors.email}</p>}

          <label className="input input-bordered flex items-center gap-2 mt-5">
            <i className="fa-solid fa-key opacity-70"></i>
            <input name="password" type={showPassword ? "text" : "password"} className="grow overflow-hidden" placeholder="Enter Your Password" value={values.password} onChange={handleChange} onBlur={handleBlur} />

            {showPassword ? <i className="fa-solid fa-eye opacity-70" onClick={() => setShowPassword(!showPassword)}></i> : <i className="fa-solid fa-eye-slash opacity-70" onClick={() => setShowPassword(!showPassword)}></i>}
          </label>
          {errors.password && touched.password && <p className="text-red-600">{errors.password}</p>}

          {errors.serverError && <p className="text-red-600 mt-2">{errors.serverError}</p>}
          <button className="btn btn-primary w-full mt-5" type="submit" disabled={isSubmitting || isLoading}>
            Login
          </button>
        </form>

        <div className="flex mt-3 justify-center">
          <h3 className="text-lg me-2">Don't have an account?</h3>
          <button type="submit" className="btn btn-xs btn-primary" onClick={() => dispatch(toggleRegisterModal())}>
            Register
          </button>
        </div>
      </div>
      {/* Modal close on outside click */}
      <label
        className="modal-backdrop"
        onClick={() => {
          !disableClickOutside && dispatch(toggleLoginModal());
        }}
      >
        Close
      </label>
    </div>
  );
};

export default LoginModal;
