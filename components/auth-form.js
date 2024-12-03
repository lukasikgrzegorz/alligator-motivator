"use client";
import Link from "next/link";
import Image from "next/image";
import { useFormState } from "react-dom";

import { auth } from "@/actions/auth-actions";

export default function AuthForm({ mode }) {
  const [formState, formAction] = useFormState(auth.bind(null, mode), {});
  return (
    <form id="auth-form" action={formAction}>
      <div className="image-container">
        <Image src="/images/logo.png" fill priority alt="A aligator icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Hasło</label>
        <input type="password" name="password" id="password" />
      </p>
      {formState.errors && (
        <ul id="form-errors">
          {Object.keys(formState.errors).map((error) => (
            <li key={error}>{formState.errors[error]}</li>
          ))}
        </ul>
      )}
      <p>
        <button type="submit">
          {mode === "login" ? "Zaloguj się" : "Utwórz konto"}
        </button>
      </p>
      <p>
        {mode === "login" && <Link href="/?mode=signup">Utwórz konto.</Link>}
        {mode === "signup" && (
          <Link href="/?mode=login">Zaloguj się na istniejące konto.</Link>
        )}
      </p>
    </form>
  );
}
