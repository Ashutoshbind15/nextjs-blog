import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-6 py-2 border-b-2 border-slate-300">
      <Link href={"/"} className="flex-1">
        Home
      </Link>

      <div className="flex items-center gap-x-3">
        <Link href={"/blogs"}>Blogs</Link>

        <SignedIn>
          <UserButton />
        </SignedIn>

        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </div>
  );
};

export default Navbar;
