"use client";
import { useFormState } from "react-dom";
import { useState } from "react";
import { addTask } from "@/actions/task-actions";
import { FaPencilAlt } from "react-icons/fa";
import Image from "next/image";
import classes from "./task-form.module.css";

export default function TaskForm({ userId, childId }) {
  const [formState, formAction] = useFormState(addTask, {});
  const [icon, setIcon] = useState(1);
  const [showIcons, setShowIcons] = useState(false);
  const [isRecurring, setIsRecurring] = useState(true);

  const handleIconClick = (selectedIcon) => {
    setShowIcons(false);
    setIcon(selectedIcon);
  };

  const handleIconsShow = () => {
    setShowIcons(true);
  };

  const handleRecurringChange = (event) => {
    setIsRecurring(event.target.value === "1");
  };

  return (
    <form id="task-form" className={classes["form"]} action={formAction}>
      <input type="hidden" name="userId" id="userId" value={userId} />
      <input type="hidden" name="childId" id="childId" value={childId} />
      <input
        type="hidden"
        name="imageUrl"
        id="imageUrl"
        value={`/tasks/${icon}.jpg`}
      />

      {showIcons && (
        <ul className={classes["icon-list"]}>
          {Array.from({ length: 4 }, (_, index) => (
            <li
              key={index}
              className={classes["image-container"]}
              onClick={() => handleIconClick(index + 1)}>
              <Image
                src={`/tasks/${index + 1}.jpg`}
                fill
                priority
                alt={`Avatar ${index + 1}`}
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
          src={`/tasks/${icon}.jpg`}
          fill
          priority
          alt="Icon"
          className={classes["image"]}
        />
      </div>
      <div className={classes["wrapper"]}>
        <p className={`${classes["paragraph"]} ${classes["coin-paragraph"]}`}>
          <label htmlFor="points" className={classes["label"]}>
            <div className={classes["coin-container"]}>
              <Image src="/images/coin.png" fill priority alt="A coin icon" />
            </div>
          </label>
          <input
            type="number"
            name="points"
            id="points"
            required
            className={classes["input"]}
          />
        </p>
        <p className={classes["paragraph"]}>
          <label htmlFor="name" className={classes["label"]}>
            Nazwa zadania
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className={classes["input"]}
          />
        </p>
        <p className={classes["paragraph"]}>
          <label htmlFor="is_recurring" className={classes["label"]}>
            Codziennie?
          </label>
          <select
            name="is_recurring"
            id="is_recurring"
            required
            className={classes["input"]}
            onChange={handleRecurringChange}>
            <option value="1">Tak</option>
            <option value="0">Nie</option>
          </select>
        </p>

        <p
          className={`${classes["paragraph"]} ${
            isRecurring ? classes["disabled"] : ""
          }`}>
          <label htmlFor="start_date" className={classes["label"]}>
            Data rozpoczęcia
          </label>
          <input
            type="date"
            name="start_date"
            id="start_date"
            className={classes["input"]}
            disabled={isRecurring}
          />
        </p>

        <p
          className={`${classes["paragraph"]} ${
            isRecurring ? classes["disabled"] : ""
          }`}>
          <label htmlFor="end_date" className={classes["label"]}>
            Data zakończenia
          </label>
          <input
            type="date"
            name="end_date"
            id="end_date"
            className={classes["input"]}
            disabled={isRecurring}
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
          Dodaj zadanie
        </button>
      </p>
    </form>
  );
}
