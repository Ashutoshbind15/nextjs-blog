import Link from "next/link";
import Userdata from "../auth/userdata";
import LogoutButton from "../auth/Logout";
import AuthWrapper from "../wrappers/AuthWrapper";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-6 py-2 border-b-2 border-slate-300">
      <Link href={"/"} className="flex-1">
        Home
      </Link>

      <div className="flex items-center gap-x-3">
        <Link href={"/blogs"}>Blogs</Link>
        <Userdata>
          <LogoutButton />
        </Userdata>
        <AuthWrapper>
          <Link href={"/dashboard"}>Dashboard</Link>
        </AuthWrapper>
      </div>
    </div>
  );
};

export default Navbar;
