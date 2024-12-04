"use client";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name, isRequired }) {
  const [pickedImage, setPickedImage] = useState();
  const imageInput = useRef();

  function handleClickPick() {
    imageInput.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>Nie dodano obrazu</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="The image selected by the user"
              fill
            />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required={isRequired}
        />
        <button
          className={classes.button}
          type="button"
          onClick={handleClickPick}>
          Dodaj obraz
        </button>
      </div>
    </div>
  );
}
