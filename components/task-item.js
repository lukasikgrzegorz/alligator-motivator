"use client";
import Image from "next/image";
import { useFormState } from "react-dom";
import { updateChildPoints } from "@/actions/child-actions";
import { deleteTask } from "@/actions/task-actions";
import classes from "./task-item.module.css";
import { FaCheck, FaTrash } from "react-icons/fa";

export default function TaskItem({ item, childPoints, mode }) {
  const [formState, formAction] = useFormState(
    mode === "parent" ? deleteTask : updateChildPoints,
    {}
  );
  const points = childPoints + item.points;

  return (
    <div className={classes["container"]}>
      <div className={classes["image-container"]}>
        <Image
          className={classes["image"]}
          src={item.image}
          fill
          priority
          alt="A coin icon"
        />
      </div>

      <div className={classes["wrapper"]}>
        <h3 className={classes["name"]}>{item.name}</h3>
        <p className={classes["frequency"]}>
          {item.is_recurring
            ? "Codziennie"
            : `Od ${item.start_date} do ${item.end_date}`}
        </p>
        <div className={classes["points-container"]}>
          <div className={classes["coin-container"]}>
            <Image src="/images/coin.png" fill priority alt="A coin icon" />
          </div>
          <p className={classes["points"]}>{item.points}</p>
        </div>
      </div>

      <form className={classes["form"]} id="task-form" action={formAction}>
        <input
          type="hidden"
          name="userId"
          id="userId"
          value={item["user_id"]}
        />
        <input
          type="hidden"
          name="childId"
          id="childId"
          value={item["child_id"]}
        />
        <input type="hidden" name="type" id="type" value="task" />
        <input
          type="hidden"
          name="childPoints"
          id="childPoints"
          value={points}
        />
        <input type="hidden" name="points" id="points" value={item.points} />
        <input
          type="hidden"
          name="activityId"
          id="activityId"
          value={item.id}
        />
        {mode === "parent" ? (
          <p>
            <button type="submit" className={classes["button"]}>
              <FaTrash />
            </button>
          </p>
        ) : (
          <p>
            <button type="submit" className={classes["button"]}>
              <FaCheck />
            </button>
          </p>
        )}
      </form>
    </div>
  );
}
