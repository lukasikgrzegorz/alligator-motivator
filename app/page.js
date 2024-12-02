import { redirect } from "next/navigation";
import { verifyAuth } from "@/lib/auth";
import AuthForm from "@/components/auth-form";

export default async function Home({ searchParams }) {
  const result = await verifyAuth();

  if (result.user) {
    return redirect("/children");
  }

  const formMode = searchParams.mode || "login";

  return <AuthForm mode={formMode} />;
}
