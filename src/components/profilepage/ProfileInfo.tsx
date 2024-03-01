import { Bounce, toast } from "react-toastify";
import { selectCurrentUser, setUser } from "../../Redux/features/auth/usersSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks/hook";
import { useUpdateProfileMutation } from "../../Redux/features/api/usersApiSlice";
import { FormikProps, useFormik } from "formik";
import { updateprofileSchema } from "../../validations/updateprofileSchema";

interface InitialValues {
  name: string;
  mobile: string;
  avater?: string;
  serverError?: string;
}

const ProfileInfo = () => {
  const user = useAppSelector(selectCurrentUser);
  if (!user) {
    window.location.reload();
  }

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

  // Form submit function
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const onSubmit = async (values: InitialValues) => {
    try {
      const result = await updateProfile({ ...values }).unwrap();
      dispatch(setUser(result));
      setErrors({ serverError: "" });
      notify("Profile updated successfully");
    } catch (error: any) {
      setErrors({ serverError: error?.data?.message });
      notify(error?.data?.message);
    }
  };

  // formik validation
  const { setFieldValue, values, errors, setErrors, touched, isSubmitting, handleSubmit, handleChange, handleBlur }: FormikProps<InitialValues> = useFormik<InitialValues>({
    initialValues: {
      name: user?.name || "",
      mobile: user?.mobile || "",
      avater: ""
    },
    validationSchema: updateprofileSchema,
    onSubmit: onSubmit
  });

  // image to base64 converter
  const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        if (fileReader.result !== null && fileReader.result !== undefined) {
          resolve(fileReader.result);
        }
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // validate profile pic
  const validateProfilePic = async (e: any, setFieldValue: any) => {
    const file = e.target.files[0];
    if ((file?.size / 1024 / 1024 < 1 && file?.type === "image/jpeg") || file?.type === "image/png" || file?.type === "image/jpg") {
      const base64 = await convertToBase64(file);
      setFieldValue("avater", base64);
    } else {
      setErrors({ avater: "Image not valid or more than 1MB" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="avatar flex justify-center mt-8">
        <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 relative">
          <img src={values.avater || user?.avater?.url || import.meta.env.VITE_DEFAULT_AVATER} />

          <label htmlFor="fileInput" className="absolute bottom-4 right-1 flex items-center justify-center w-8 h-8 rounded-full cursor-pointer bg-base-300">
            <input id="fileInput" type="file" className="hidden" accept="image/jpeg, image/png, image/jpg" onChange={(e) => validateProfilePic(e, setFieldValue)} onBlur={handleBlur} />
            <i className="fa-solid fa-circle-arrow-up fa-xl"></i>
          </label>
        </div>
      </div>
      {errors.avater && touched.avater && <p className="text-red-600 mt-5 text-center">{errors.avater.toString()}</p>}
      <div className="grid grid-cols-6 gap-5 mt-10">
        {/* email */}
        <div className="col-span-6 md:col-span-3">
          <label className="input input-bordered flex items-center gap-2">
            <i className="fa-solid fa-envelope opacity-70"></i>
            <input name="email" type="text" className="grow overflow-hidden" value={user?.email || ""} readOnly />
          </label>
        </div>
        {/* role */}
        <div className="col-span-6 md:col-span-3">
          <label className="input input-bordered flex items-center gap-2">
            <i className="fa-solid fa-ribbon opacity-70"></i>
            <input name="role" type="text" className="grow overflow-hidden" value={user?.role || ""} readOnly />
          </label>
        </div>
        {/* name */}
        <div className="col-span-6 md:col-span-3">
          <label className="input input-bordered flex items-center gap-2">
            <i className="fa-solid fa-user opacity-70"></i>
            <input name="name" type="text" className="grow overflow-hidden" placeholder="Enter Your Name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
          </label>
          {errors.name && touched.name && <p className="text-red-600">{errors.name}</p>}
        </div>
        {/* mobile */}
        <div className="col-span-6 md:col-span-3">
          <label className="input input-bordered flex items-center gap-2">
            <i className="fa-solid fa-phone opacity-70"></i>
            <input name="mobile" type="text" className="grow overflow-hidden" placeholder="Enter Mobile" value={values.mobile} onChange={handleChange} onBlur={handleBlur} />
          </label>
          {errors.mobile && touched.mobile && <p className="text-red-600">{errors.mobile}</p>}
        </div>
        {/* submit */}
        <div className="col-span-6 md:col-span-3">
          <button type="submit" className="btn btn-secondary mt-5 " disabled={isSubmitting || isLoading}>
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileInfo;
