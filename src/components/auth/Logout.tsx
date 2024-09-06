import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { lucia, validateRequest } from "@/lib/auth/lucia";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";

export default async function LogoutButton() {
  return (
    <form action={logout}>
      <Button className="flex items-center gap-x-4">
        <span>Sign out</span>
        <LogOutIcon />
      </Button>
    </form>
  );
}

async function logout(): Promise<ActionResult> {
  "use server";
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/login?redirect=loggedout");
}

interface ActionResult {
  error: string | null;
}
