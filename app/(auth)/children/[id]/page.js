import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import TaskItem from "@/components/task-item";
import TaskForm from "@/components/task-form";
import RewardItem from "@/components/reward-item";
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
              <TaskItem
                taskName={task.name}
                taksPoints={task.points}
                userId={userId}
                childId={id}
                childPoints={child.points}
              />
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
              <RewardItem
                rewardName={reward.name}
                rewardPoints={reward.points}
                userId={userId}
                childId={id}
                childPoints={child.points}
              />
            </li>
          ))}
        </ul>
        <RewardForm userId={userId} childId={id} />
      </div>
    </main>
  );
}
