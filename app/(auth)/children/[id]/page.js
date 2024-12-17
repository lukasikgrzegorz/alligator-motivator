import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import TaskItem from "@/components/task-item";
import RewardItem from "@/components/reward-item";
import { getChild } from "@/lib/children";
import { getTasks, getUncompletedTasks } from "@/lib/tasks";
import { getRewards } from "@/lib/rewards";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import classes from "./page.module.css";

export default async function ChildDetailsPage({ params, searchParams }) {
  const pageMode = searchParams.mode || "child";

  if (pageMode === "parent") {
    const result = await verifyAuth();
    if (!result.user) {
      return redirect("/");
    }
  }

  const { id } = params;

  const child = getChild(id);
  const tasks = pageMode === "parent" ? getTasks(id) : getUncompletedTasks(id);
  const rewards = getRewards(id);

  return (
    <main>
      <div className={classes["profile"]}>
        <div className={classes["image-container"]}>
          <Image
            className={classes["image"]}
            src={child.image}
            fill
            priority
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
            <ul className={classes["list"]}>
              {tasks.map((task) => (
                <li key={task.id}>
                  <TaskItem item={task} childPoints={child.points} />
                </li>
              ))}
            </ul>
            {pageMode === "parent" && (
              <Link href={`/children/${id}/tasks`}>
                <button className={classes["button"]}>
                  <FaPlus fontSize={15} />
                Dodaj
                </button>
              </Link>
            )}
          </div>
        </div>

        <div className={classes["column"]}>
          <h2 className={classes["header"]}>Nagrody</h2>
          <div className={classes["container"]}>
            <ul className={classes["list"]}>
              {rewards.map((reward) => (
                <li key={reward.id}>
                  <RewardItem item={reward} childPoints={child.points} />
                </li>
              ))}
            </ul>
            {pageMode === "parent" && (
              <Link href={`/children/${id}/rewards`}>
                <button className={classes["button"]}>
                  <FaPlus fontSize={15} />
                Dodaj
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
