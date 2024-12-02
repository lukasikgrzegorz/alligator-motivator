"use client";
import { useFormState } from "react-dom";
import { addChild } from "@/actions/child-actions";
import ImagePicker from "./image-picker";

export default function ChildForm({ userId }) {
  const [formState, formAction] = useFormState(addChild, {});
  return (
    <form id="auth-form" action={formAction}>
      <input type="hidden" name="userId" id="userId" value={userId} />
      <ImagePicker name="image" label="Zdjęcie" isRequired={false} />
      <p>
        <label htmlFor="name">Imię</label>
        <input type="text" name="name" id="name" />
      </p>

      {formState?.errors && (
        <ul id="form-errors">
          {Object.keys(formState.errors).map((error) => (
            <li key={error}>{formState.errors[error]}</li>
          ))}
        </ul>
      )}
      <p>
        <button type="submit">Dodaj dziecko</button>
      </p>
    </form>
  );
}
