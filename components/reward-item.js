"use client";
import Image from "next/image";
import { useFormState } from "react-dom";
import { updateChildPoints } from "@/actions/child-actions";
import { deleteReward } from "@/actions/reward-actions";
import classes from "./reward-item.module.css";
import { FaCheck, FaTrash } from "react-icons/fa";

export default function RewardItemItem({ item, childPoints, mode }) {
  const [formState, formAction] = useFormState(
    mode === "parent" ? deleteReward : updateChildPoints,
    {}
  );
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
        <input type="hidden" name="type" id="type" value="reward" />
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
        <p>
          {mode === "parent" ? (
            <button type="submit" className={classes["button"]}>
              <FaTrash />
            </button>
          ) : (
            <button
              type="submit"
              className={classes["button"]}
              disabled={childPoints < item.points}>
              <FaCheck />
            </button>
          )}
        </p>
      </form>
    </div>
  );
}
