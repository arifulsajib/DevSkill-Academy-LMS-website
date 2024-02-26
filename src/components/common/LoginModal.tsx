import cn from "classnames";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks/hook";
import { getLoginOpen, toggleLoginModal, toggleRegisterModal } from "../../Redux/features/toggle/modalSlice";
import { useState } from "react";

interface Props {
  disableClickOutside?: boolean;
}

const LoginModal = ({ disableClickOutside }: Props) => {
  // get redux state
  const dispatch = useAppDispatch();
  const openLogin = useAppSelector(getLoginOpen);

  // show modal is open is true
  const modalClass = cn({
    "modal modal-middle": true,
    "modal-open": openLogin
  });

  //   toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

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
          <label className="input input-bordered flex items-center gap-2 mb-5">
            <i className="fa-solid fa-envelope opacity-70"></i>
            <input type="text" className="grow" placeholder="Enter Your Email" />
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-5">
            <i className="fa-solid fa-key opacity-70"></i>
            <input type={showPassword ? "text" : "password"} className="grow" placeholder="Enter Your Password" />
            {showPassword ? <i className="fa-solid fa-eye opacity-70" onClick={() => setShowPassword(!showPassword)}></i> : <i className="fa-solid fa-eye-slash opacity-70" onClick={() => setShowPassword(!showPassword)}></i>}
          </label>
          <button className="btn btn-primary w-full ">Login</button>
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
