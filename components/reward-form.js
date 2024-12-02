"use client";
import { useFormState } from "react-dom";
import { addReward } from "@/actions/reward-actions";
import ImagePicker from "./image-picker";

export default function RewardForm({ userId, childId }) {
  const [formState, formAction] = useFormState(addReward, {});

  return (
    <form id="reward-form" action={formAction}>
      <input type="hidden" name="userId" id="userId" value={userId} />
      <input type="hidden" name="childId" id="childId" value={childId} />
      <ImagePicker name="image" label="Zdjęcie" isRequired={false} />
      <p>
        <label htmlFor="name">Nazwa nagrody</label>
        <input type="text" name="name" id="name" required />
      </p>
      <p>
        <label htmlFor="description">Opis</label>
        <textarea name="description" id="description" required></textarea>
      </p>
      <p>
        <label htmlFor="points">Punkty</label>
        <input type="number" name="points" id="points" required />
      </p>

      {formState?.errors && (
        <ul id="form-errors">
          {Object.keys(formState.errors).map((error) => (
            <li key={error}>{formState.errors[error]}</li>
          ))}
        </ul>
      )}
      <p>
        <button type="submit">Dodaj nagrodę</button>
      </p>
    </form>
  );
} 