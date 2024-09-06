"use client";

import { useUser } from "@/hooks/queries/user";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const AdminData = () => {
  const { userdata, isUserError, isUserLoading, userError } = useUser();

  if (isUserLoading) return <div>Loading...</div>;

  if (isUserError) {
    return <div>Error: {userError?.message}</div>;
  }

  const { user } = userdata;

  return (
    <div className="flex items-center gap-x-2 relative">
      <h1>{user?.username}</h1>
    </div>
  );
};

export default AdminData;
