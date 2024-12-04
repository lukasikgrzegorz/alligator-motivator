"use client";
import { useRouter } from "next/navigation";
import classes from "./modal.module.css";

export default function Modal({ children }) {
  const router = useRouter();

  return (
    <>
      <div className={classes["backdrop"]} onClick={router.back} />
      <dialog className={classes["modal"]} open>
        {children}
      </dialog>
    </>
  );
}
