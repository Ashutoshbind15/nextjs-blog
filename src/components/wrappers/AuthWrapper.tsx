"use client";

import { useUser } from "@/hooks/queries/user";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { userdata, isUserError, isUserLoading, userError } = useUser();

  if (userdata?.user) {
    return <>{children}</>;
  }

  return null;
};

export default AuthWrapper;
