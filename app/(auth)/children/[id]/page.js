import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import TaskItem from "@/components/task-item";
import RewardItem from "@/components/reward-item";
import { getChild } from "@/lib/children";
import { getTasks } from "@/lib/tasks";
import { getRewards } from "@/lib/rewards";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import classes from "./page.module.css";

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
            src={child.image}
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
          <div className={classes["container"]}>
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
            <Link href={`/children/${id}/tasks`}>
              <button className={classes["button"]}>
                <FaPlus fontSize={15} />
                Dodaj
              </button>
            </Link>
          </div>
        </div>

        <div className={classes["column"]}>
          <h2 className={classes["header"]}>Nagrody</h2>
          <div className={classes["container"]}>
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
            <Link href={`/children/${id}/rewards`}>
              <button className={classes["button"]}>
                <FaPlus fontSize={15} />
                Dodaj
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
