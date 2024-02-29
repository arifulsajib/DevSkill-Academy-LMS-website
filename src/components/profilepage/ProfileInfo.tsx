import { selectCurrentUser } from "../../Redux/features/auth/usersSlice";
import { useAppSelector } from "../../Redux/hooks/hook";

const ProfileInfo = () => {
  const user = useAppSelector(selectCurrentUser);
  return (
    <>
      <div className="avatar flex justify-center mt-8">
        <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={user?.avater?.url || import.meta.env.VITE_DEFAULT_AVATER} />
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
