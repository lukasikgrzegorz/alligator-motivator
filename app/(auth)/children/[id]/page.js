import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import TaskItem from "@/components/task-item";
import TaskForm from "@/components/task-form";
import RewardItem from "@/components/reward-item";
import RewardForm from "@/components/reward-form";
import { getChild } from "@/lib/children";
import { getTasks } from "@/lib/tasks";
import { getRewards } from "@/lib/rewards";
import Image from "next/image";

const AWS_REGION = process.env.AWS_REGION;
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

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
      <div className="child-card">
        <div className="image-container">
          <Image
            src={`https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${child.image}`}
            fill
            alt={child.name}
          />
        </div>
        <h2>{child.name}</h2>
        <h1>{child.points}</h1>
      </div>

      <div className="wrapper">
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
      </div>
    </main>
  );
}
