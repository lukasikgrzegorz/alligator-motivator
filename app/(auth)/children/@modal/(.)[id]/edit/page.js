import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getChild } from "@/lib/children";
import ChildEditForm from "@/components/child-edit-form";
import Modal from "@/components/modal";

export default async function AddChildPage({ params }) {
  const result = await verifyAuth();

  if (!result.user) {
    return redirect("/");
  }

  const { id } = params;
  const child = getChild(id);
  const userId = result.user.id;
  
  return (
    <Modal>
      <ChildEditForm userId={userId} child={child} />
    </Modal>
  );
}
