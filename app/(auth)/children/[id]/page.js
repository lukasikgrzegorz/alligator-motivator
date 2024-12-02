import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ChildForm from "@/components/child-form";
import TaskForm from "@/components/task-form";
import RewardForm from "@/components/reward-form";
import { getChild } from "@/lib/children";
import { getTasks } from "@/lib/tasks";
import { getRewards } from "@/lib/rewards";


export default async function ChildDetailsPage({ params }) {
  const result = await verifyAuth();
  const { id } = params;

  if (!result.user) {
    return redirect("/");
  }

  const userId = result.user.id;

  const child = await getChild(id, userId);
  const tasks = await getTasks(id);
  const rewards = await getRewards(id);

  return (
    <main>
      <h1>{child.name}</h1>
      <h2>{child.points} punktów</h2>

      <div>
        <h2>Zadania</h2>

        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <form>
                {task.name} - {task.points} punktów
                <button type="sumbit">Wykonaj</button>
              </form>
            </li>
          ))}
        </ul>
        <TaskForm userId={userId} childId={id} />
      </div>

      <div>
        <h2>Nagrody</h2>
        <ul>
          {rewards.map((reward) => (
            <li key={reward.id}>
              {reward.name} - {reward.points} punktów
            </li>
          ))}
        </ul>
        <RewardForm userId={userId} childId={id} />
      </div>
    </main>
  );
}
