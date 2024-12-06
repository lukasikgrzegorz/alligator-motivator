"use client";
import { useFormState } from "react-dom";
import { useState } from "react";
import { addReward } from "@/actions/reward-actions";
import { FaPencilAlt } from "react-icons/fa";
import Image from "next/image";
import classes from "./reward-form.module.css";

export default function RewardForm({ userId, childId }) {
  const [formState, formAction] = useFormState(addReward, {});
  const [icon, setIcon] = useState(1);
  const [showIcons, setShowIcons] = useState(false);

  const handleIconClick = (selectedIcon) => {
    setShowIcons(false);
    setIcon(selectedIcon);
  };

  const handleIconsShow = () => {
    setShowIcons(true);
  };

  return (
    <form id="reward-form" className={classes["form"]} action={formAction}>
      <input type="hidden" name="userId" id="userId" value={userId} />
      <input type="hidden" name="childId" id="childId" value={childId} />
      <input
        type="hidden"
        name="imageUrl"
        id="imageUrl"
        value={`/rewards/${icon}.jpg`}
      />

      {showIcons && (
        <ul className={classes["icon-list"]}>
          {Array.from({ length: 4 }, (_, index) => (
            <li
              key={index}
              className={classes["image-container"]}
              onClick={() => handleIconClick(index + 1)}>
              <Image
                src={`/rewards/${index + 1}.jpg`}
                fill
                priority
                alt={`Reward ${index + 1}`}
                className={classes["image"]}
              />
            </li>
          ))}
        </ul>
      )}
      <div className={classes["icon-container"]} onClick={handleIconsShow}>
        <button type="button" className={classes["edit-button"]}>
          <FaPencilAlt size={40} />
        </button>
        <Image
          src={`/rewards/${icon}.jpg`}
          fill
          priority
          alt="Icon"
          className={classes["image"]}
        />
      </div>
      <div className={classes["wrapper"]}>
        <p className={classes["paragraph"]}>
          <label htmlFor="name" className={classes["label"]}>
            Nazwa nagrody
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className={classes["input"]}
          />
        </p>
        <p className={`${classes["paragraph"]} ${classes["coin-paragraph"]}`}>
          <label htmlFor="points" className={classes["label"]}>
            <span className={classes["coin-container"]}>
              <Image src="/images/coin.png" fill priority alt="A coin icon" />
            </span>
          </label>
          <input
            type="number"
            name="points"
            id="points"
            required
            className={classes["input"]}
          />
        </p>
      </div>

      {formState?.errors && (
        <ul id="form-errors">
          {Object.keys(formState.errors).map((error) => (
            <li key={error}>{formState.errors[error]}</li>
          ))}
        </ul>
      )}
      <p className={classes["paragraph"]}>
        <button type="submit" className={classes["button"]}>
          Dodaj nagrodę
        </button>
      </p>
    </form>
  );
}
