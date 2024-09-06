import UserFetcher from "../../components/auth/fetcher";
import { Suspense } from "react";

export default async function Page() {
  return (
    <>
      <h1>Sign in Page</h1>
      <a href="/api/login/github">Sign in with GitHub</a>
      <Suspense>
        <UserFetcher />
      </Suspense>
    </>
  );
}
