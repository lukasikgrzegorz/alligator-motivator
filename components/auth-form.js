"use client";
import Link from "next/link";
import Image from "next/image";
import { useFormState } from "react-dom";
import { auth } from "@/actions/auth-actions";
import classes from "./auth-form.module.css";

export default function AuthForm({ mode }) {
  const [formState, formAction] = useFormState(auth.bind(null, mode), {});
  return (
    <form id="auth-form" className={classes["form"]} action={formAction}>
      <div className={classes["image-container"]}>
        <Image src="/images/logo.png" fill priority alt="A aligator icon" />
      </div>
      <p className={classes["paragraph"]}>
        <label className={classes["label"]} htmlFor="email">
          Email
        </label>
        <input
          input
          className={classes["input"]}
          type="email"
          name="email"
          id="email"
        />
      </p>
      <p className={classes["paragraph"]}>
        <label htmlFor="password" className={classes["label"]}>
          Hasło
        </label>
        <input
          className={classes["input"]}
          type="password"
          name="password"
          id="password"
        />
      </p>
      {formState.errors && (
        <ul id="form-errors">
          {Object.keys(formState.errors).map((error) => (
            <li key={error}>{formState.errors[error]}</li>
          ))}
        </ul>
      )}
      <p>
        <button className={classes["button"]} type="submit">
          {mode === "login" ? "Zaloguj się" : "Utwórz konto"}
        </button>
      </p>
      <p>
        {mode === "login" && (
          <Link className={classes["link"]} href="/?mode=signup">
            Utwórz konto.
          </Link>
        )}
        {mode === "signup" && (
          <Link className={classes["link"]} href="/?mode=login">
            Zaloguj się na istniejące konto.
          </Link>
        )}
      </p>
    </form>
  );
}
