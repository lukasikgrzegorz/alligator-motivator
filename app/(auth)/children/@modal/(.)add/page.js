import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ChildForm from "@/components/child-form";
import Modal from "@/components/modal";

export default async function AddChildModalPage() {
  const result = await verifyAuth();

  if (!result.user) {
    return redirect("/");
  }

  const userId = result.user.id;
  return (
    <Modal>
      <ChildForm userId={userId} />
    </Modal>
  );
}
