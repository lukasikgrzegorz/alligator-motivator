"use client";
import Image from "next/image";
import { useFormState } from "react-dom";
import { updateChildPoints } from "@/actions/child-actions";
import classes from "./reward-item.module.css";
import { FaCheck } from "react-icons/fa";

export default function TaskItem({ item, childPoints }) {
  const [formState, formAction] = useFormState(updateChildPoints, {});
  const points = childPoints - item.points;

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
        <div className={classes["points-container"]}>
          <progress
            value={childPoints}
            max={item.points}
            className={classes["progress-bar"]}
          />
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
        <input type="hidden" name="points" id="points" value={points} />
        <p>
          <button
            type="submit"
            className={classes["button"]}
            disabled={childPoints < item.points}>
            <FaCheck />
          </button>
        </p>
      </form>
    </div>
  );
}
