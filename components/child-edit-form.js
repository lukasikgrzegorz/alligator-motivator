"use client";
import { useFormState } from "react-dom";
import { useState } from "react";
import { editChild } from "@/actions/child-actions";
import classes from "./child-edit-form.module.css";
import Image from "next/image";
import { FaPencilAlt, FaTrash, FaCheck } from "react-icons/fa";

export default function ChildEditForm({ userId, child }) {
  const userImage = Number(child.image.split("/")[2].split(".")[0]);

  const [formState, formAction] = useFormState(editChild, {});
  const [avatar, setAvatar] = useState(userImage);
  const [actionType, setActionType] = useState("update");
  const [showAvatars, setShowAvatars] = useState(false);

  const handleAvatarClick = (selectedAvatar) => {
    setShowAvatars(false);
    setAvatar(selectedAvatar);
  };

  const handleAvatarsShow = () => {
    setShowAvatars(true);
  };

  return (
    <>
      <form action={formAction} className={classes["form"]}>
        <input type="hidden" name="userId" id="userId" value={userId} />
        <input type="hidden" name="childId" id="childId" value={child.id} />
        <input
          type="hidden"
          name="actionType"
          id="actionType"
          value={actionType}
        />
        <input
          type="hidden"
          name="imageUrl"
          id="imageUrl"
          value={`/avatars/${avatar}.jpg`}
        />

        {showAvatars && (
          <ul className={classes["avatar-list"]}>
            {Array.from({ length: 12 }, (_, index) => (
              <li
                key={index}
                className={classes["image-container"]}
                onClick={() => handleAvatarClick(index + 1)}>
                <Image
                  src={`/avatars/${index + 1}.jpg`}
                  fill
                  priority
                  alt={`Avatar ${index + 1}`}
                  className={classes["image"]}
                />
              </li>
            ))}
          </ul>
        )}
        <div
          className={classes["avatar-container"]}
          onClick={handleAvatarsShow}>
          <button type="button" className={classes["edit-button"]}>
            <FaPencilAlt size={60} />
          </button>
          <Image
            src={`/avatars/${avatar}.jpg`}
            fill
            priority
            alt="Avatar"
            className={classes["image"]}
          />
        </div>
        <p className={classes["paragraph"]}>
          <label htmlFor="name" className={classes["label"]}>
            Imię
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className={classes["input"]}
            defaultValue={child.name}
          />
        </p>
        {formState?.errors && (
          <ul id="form-errors">
            {Object.keys(formState.errors).map((error) => (
              <li key={error}>{formState.errors[error]}</li>
            ))}
          </ul>
        )}
        <p className={classes["button-container"]}>
          <button type="submit" className={classes["button"]}>
            <FaCheck size={15} /> Zapisz
          </button>
          <button
            type="submit"
            className={`${classes["button"]} ${classes["delete"]}`}
            onClick={(e) => {
              if (!window.confirm("Czy na pewno chcesz usunąć?")) {
                e.preventDefault();
              } else {
                setActionType("delete");
              }
            }}>
            <FaTrash size={15} /> Usuń
          </button>
        </p>
      </form>
    </>
  );
}
