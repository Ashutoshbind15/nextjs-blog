"use client";

import { useUser } from "@/hooks/queries/user";
import Link from "next/link";

const Userdata = ({ children }: { children: React.ReactNode }) => {
  const { userdata, isUserError, isUserLoading, userError } = useUser();

  if (isUserLoading) return <div>Loading...</div>;

  if (!userdata?.user) {
    return <Link href="/login"> Login </Link>;
  }

  if (isUserError) {
    return <div>Error: {userError?.message}</div>;
  }

  const { user } = userdata;

  return (
    <div className="flex items-center gap-x-2">
      <h1>{user?.username}</h1>
      <span>{children}</span>
    </div>
  );
};

export default Userdata;
