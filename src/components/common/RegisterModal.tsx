import cn from "classnames";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks/hook";
import { getRegisterOpen, toggleLoginModal, toggleRegisterModal } from "../../Redux/features/toggle/modalSlice";
import { useState } from "react";
import { registerSchema } from "../../validations/registerSchema";
import { FormikProps, useFormik } from "formik";

interface Props {
  disableClickOutside?: boolean;
}

interface InitialValues {
  name: string;
  email: string;
  password: string;
  serverError?: string;
}

const RegisterModal = ({ disableClickOutside }: Props) => {
  //   toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // get redux state
  const dispatch = useAppDispatch();
  const openRegister = useAppSelector(getRegisterOpen);

  // show modal is open is true
  const modalClass = cn({
    "modal modal-middle": true,
    "modal-open": openRegister
  });

  // Form submit function
  const onSubmit = (values: InitialValues, actions: any) => {
    console.log(values);
    actions.resetForm();
  };

  // formik validation
  const { values, errors, touched, isSubmitting, handleSubmit, handleChange, handleBlur }: FormikProps<InitialValues> = useFormik<InitialValues>({
    initialValues: {
      name: "",
      email: "",
      password: ""
    },
    validationSchema: registerSchema,
    onSubmit: onSubmit
  });

  return (
    <div className={modalClass}>
      <div className="modal-box">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => {
            dispatch(toggleRegisterModal());
          }}
        >
          ✕
        </button>

        <h3 className="text-lg font-bold text-center">Register to our system</h3>
        <form className="my-6" onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2">
            <i className="fa-solid fa-user opacity-70"></i>
            <input name="name" type="text" className="grow overflow-hidden" placeholder="Enter Your Name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
          </label>
          {errors.name && touched.name && <p className="text-red-600">{errors.name}</p>}

          <label className="input input-bordered flex items-center gap-2 mt-5 ">
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
          <button className="btn btn-primary w-full mt-5" type="submit" disabled={isSubmitting}>
            Register
          </button>
        </form>
        <div className="flex mt-3 justify-center">
          <h3 className="text-lg me-2">Already have an account?</h3>
          <button className="btn btn-xs btn-primary" onClick={() => dispatch(toggleLoginModal())}>
            Login
          </button>
        </div>
      </div>
      {/* Modal close on outside click */}
      <label
        className="modal-backdrop"
        onClick={() => {
          !disableClickOutside && dispatch(toggleRegisterModal());
        }}
      >
        Close
      </label>
    </div>
  );
};

export default RegisterModal;
