import cn from "classnames";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks/hook";
import { getForgetPassOpen, toggleForgetPassModal, toggleLoginModal } from "../../Redux/features/toggle/modalSlice";
import { FormikProps, useFormik } from "formik";
import { useForgetPasswordMutation } from "../../Redux/features/api/authApiSlice";
import { Bounce, toast } from "react-toastify";
import { forgetpassSchema } from "../../validations/forgetpassSchema";

interface Props {
  disableClickOutside?: boolean;
}

interface InitialValues {
  email: string;
  serverError?: string;
}

const ForgetPassModal = ({ disableClickOutside }: Props) => {
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
  const openForgetPass = useAppSelector(getForgetPassOpen);

  // show modal is open is true
  const modalClass = cn({
    "modal modal-middle": true,
    "modal-open": openForgetPass
  });

  // Form submit function
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const onSubmit = async (values: InitialValues, actions: any) => {
    try {
      const currentHost = `${window.location.protocol}//${window.location.host}`;
      const redirectUrl = currentHost + "/resetpass";
      const result = await forgetPassword({ ...values, redirectUrl }).unwrap();
      actions.resetForm();
      dispatch(toggleForgetPassModal());
      setErrors({ serverError: "" });
      notify(result.message);
    } catch (error: any) {
      setErrors({ serverError: error?.data?.message });
      notify(error.data.message);
    }
  };

  // formik validation
  const { values, errors, setErrors, touched, isSubmitting, handleSubmit, handleChange, handleBlur }: FormikProps<InitialValues> = useFormik<InitialValues>({
    initialValues: {
      email: ""
    },
    validationSchema: forgetpassSchema,
    onSubmit: onSubmit
  });

  return (
    <div className={modalClass}>
      <div className="modal-box">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => {
            dispatch(toggleForgetPassModal());
          }}
        >
          ✕
        </button>

        <h3 className="text-lg font-bold text-center">Forget Your Password?</h3>
        <p className="text-center">Request a new one</p>
        <form className="my-6" onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2">
            <i className="fa-solid fa-envelope opacity-70"></i>
            <input name="email" type="text" className="grow overflow-hidden" placeholder="Enter Your Email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
          </label>
          {errors.email && touched.email && <p className="text-red-600">{errors.email}</p>}

          {errors.serverError && <p className="text-red-600 mt-2">{errors.serverError}</p>}
          <button className="btn btn-primary w-full mt-5" type="submit" disabled={isSubmitting || isLoading}>
            {isLoading ? <span className="loading loading-spinner loading-sm"></span> : "Submit"}
          </button>
        </form>

        <div className="flex mt-3 justify-center">
          <h3 className="text-lg me-2">Remembered Password? Go to Login.</h3>
          <button type="submit" className="btn btn-xs btn-primary" onClick={() => dispatch(toggleLoginModal())}>
            Login
          </button>
        </div>
      </div>
      {/* Modal close on outside click */}
      <label
        className="modal-backdrop"
        onClick={() => {
          !disableClickOutside && dispatch(toggleForgetPassModal());
        }}
      >
        Close
      </label>
    </div>
  );
};

export default ForgetPassModal;
