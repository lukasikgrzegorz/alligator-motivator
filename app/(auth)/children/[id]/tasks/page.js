import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import TaskForm from "@/components/task-form";

export default async function AddTaskPage() {
  const result = await verifyAuth();

  if (!result.user) {
    return redirect("/");
  }

  const userId = result.user.id;
  return (
    <main>
      <TaskForm userId={userId} />
    </main>
  );
}
