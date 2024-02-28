import { selectCurrentUser } from "../Redux/features/auth/usersSlice";
import { useAppSelector } from "../Redux/hooks/hook";

const Profilepage = () => {
  const user = useAppSelector(selectCurrentUser);
  return (
    <section className="min-h-screen">
      <h1 className="text-2xl font-bold mt-2 text-center">Profile Page</h1>
      <h2 className="text-xl font-bold mt-2 text-center">
        Welcome <span className="text-primary">{user?.name}</span>
      </h2>
      <div className="avatar flex justify-center mt-8">
        <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={user?.avater?.url || import.meta.env.VITE_DEFAULT_AVATER} />
        </div>
      </div>
    </section>
  );
};

export default Profilepage;
