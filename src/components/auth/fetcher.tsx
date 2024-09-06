"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const UserFetcher = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (redirect === "loggedin" || redirect === "loggedout") {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    }
  }, [redirect, queryClient]);

  return <></>;
};

export default UserFetcher;
