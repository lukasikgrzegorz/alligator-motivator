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
import classes from "./page.module.css";

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
      <div className={classes["profile"]}>
        <div className={classes["image-container"]}>
          <Image
            className={classes["image"]}
            src={`https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${child.image}`}
            fill
            alt={child.name}
          />
        </div>
        <div className={classes["profile-details"]}>
          <h2 className={classes["name"]}>{child.name}</h2>
          <div className={classes["points-container"]}>
            <div className={classes["image-container"]}>
              <Image src="/images/coin.png" fill priority alt="A coin icon" />
            </div>
            <h1 className={classes["points"]}>{child.points}</h1>
          </div>
        </div>
      </div>

      <div className={classes["wrapper"]}>
        <div className={classes["column"]}>
          <h2 className={classes["header"]}>Zadania</h2>
          <ul lassName={classes["list"]}>
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
        <div className={classes["column"]}>
          <h2 className={classes["header"]}>Nagrody</h2>
          <ul className={classes["list"]}>
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
