import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/user");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      } catch (e) {
        return {};
      }
    },
    retry: false,
    retryOnMount: false,
    staleTime: Infinity,
  });

  return {
    userdata: data,
    isUserLoading: isLoading,
    isUserError: isError,
    userError: error,
  };
};
