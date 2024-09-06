import LogoutButton from "@/components/auth/Logout";
import UserFetcher from "../../components/auth/fetcher";

export default async function Page() {
  return (
    <>
      <h1>Sign in</h1>
      <a href="/api/login/github">Sign in with GitHub</a>
      <LogoutButton />
      <UserFetcher />
    </>
  );
}
