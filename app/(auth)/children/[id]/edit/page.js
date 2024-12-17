import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ChildEditForm from "@/components/child-edit-form";
import { getChild } from "@/lib/children";

export default async function AddChildPage({ params }) {
  const result = await verifyAuth();

  if (!result.user) {
    return redirect("/");
  }

  const { id } = params;
  const child = getChild(id);
  const userId = result.user.id;

  return (
    <main>
      <ChildEditForm userId={userId} child={child} />
    </main>
  );
}
