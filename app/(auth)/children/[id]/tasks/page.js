import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ChildForm from "@/components/child-form";

export default async function AddChildPage() {
  const result = await verifyAuth();

  if (!result.user) {
    return redirect("/");
  }

  const userId = result.user.id;
  return (
    <main>
      <ChildForm userId={userId} />
    </main>
  );
}
