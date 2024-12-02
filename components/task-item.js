"use client";
import { useFormState } from "react-dom";
import { updateChildPoints } from "@/actions/child-actions";

export default function TaskItem({
  taskName,
  taksPoints,
  userId,
  childId,
  childPoints,
}) {
  const [formState, formAction] = useFormState(updateChildPoints, {});
  const points = childPoints + taksPoints;

  return (
    <>
      <h3>{taskName}</h3>
      <p>{taksPoints}</p>
      <form id="task-form" action={formAction}>
        <input type="hidden" name="userId" id="userId" value={userId} />
        <input type="hidden" name="childId" id="childId" value={childId} />
        <input type="hidden" name="points" id="points" value={points} />
        <p>
          <button type="submit">Zatwierdź wykonanie</button>
        </p>
      </form>
    </>
  );
}
