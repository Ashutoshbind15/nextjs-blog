"use client";

import { useUser } from "@/hooks/queries/user";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const Userdata = ({ children }: { children: React.ReactNode }) => {
  const { userdata, isUserError, isUserLoading, userError } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  console.log(isDropdownOpen);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  if (isUserLoading) return <div>Loading...</div>;

  if (!userdata?.user) {
    return <Link href="/login"> Login </Link>;
  }

  if (isUserError) {
    return <div>Error: {userError?.message}</div>;
  }

  const { user } = userdata;

  return (
    <div className="flex items-center gap-x-2 relative">
      {/* User profile button */}
      <button onClick={toggleDropdown} className="flex items-center gap-x-2">
        <h1>{user?.username}</h1>
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="mt-2 w-48 bg-white shadow-md rounded-md z-10 absolute bottom-[-100px] right-0"
        >
          <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100">
            Dashboard
          </Link>
          <div className="border-t border-gray-200"></div>

          {/* Logout button passed as children */}
          <div className="px-4 py-2">{children}</div>
        </div>
      )}
    </div>
  );
};

export default Userdata;
