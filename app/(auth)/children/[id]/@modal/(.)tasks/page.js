import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import TaskForm from "@/components/task-form";
import Modal from "@/components/modal";

export default async function AddTaskModalPage({ params }) {
  const result = await verifyAuth();
  const { id } = params;

  if (!result.user) {
    return redirect("/");
  }

  const userId = result.user.id;
  return (
    <Modal>
      <TaskForm userId={userId} childId={id} />
    </Modal>
  );
}
