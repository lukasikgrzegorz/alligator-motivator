"use client";
import { useFormState } from "react-dom";
import { useState } from "react";
import { addChild } from "@/actions/child-actions";
import classes from "./child-form.module.css";
import Image from "next/image";
import { FaPencilAlt } from "react-icons/fa";

export default function ChildForm({ userId }) {
  const [formState, formAction] = useFormState(addChild, {});
  const [avatar, setAvatar] = useState(1);
  const [showAvatars, setShowAvatars] = useState(false);

  const handleAvatarClick = (selectedAvatar) => {
    setShowAvatars(false);
    setAvatar(selectedAvatar);
  };

  const handleAvatarsShow = () => {
    setShowAvatars(true);
  };

  return (
    <form id="auth-form" action={formAction} className={classes["form"]}>
      <input type="hidden" name="userId" id="userId" value={userId} />
      <input
        type="hidden"
        name="imageUrl"
        id="imageUrl"
        value={`/avatars/${avatar}.jpg`}
      />

      {showAvatars ? (
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
      ) : (
        <>
          {" "}
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
            />
          </p>
          {formState?.errors && (
            <ul id="form-errors">
              {Object.keys(formState.errors).map((error) => (
                <li key={error}>{formState.errors[error]}</li>
              ))}
            </ul>
          )}
          <p className={classes["paragraph"]}>
            <button type="submit" className={classes["button"]}>
              Dodaj
            </button>
          </p>
        </>
      )}
    </form>
  );
}
