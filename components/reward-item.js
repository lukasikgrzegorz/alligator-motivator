"use client";
import { useFormState } from "react-dom";
import { updateChildPoints } from "@/actions/child-actions";

export default function RewardItem({
  rewardName,
  rewardPoints,
  userId,
  childId,
  childPoints,
}) {
  const [formState, formAction] = useFormState(updateChildPoints, {});
  const points = childPoints - rewardPoints;

  return (
    <>
      <h3>{rewardName}</h3>
      <p>{rewardPoints}</p>
      <form id="reward-form" action={formAction}>
        <input type="hidden" name="userId" id="userId" value={userId} />
        <input type="hidden" name="childId" id="childId" value={childId} />
        <input type="hidden" name="points" id="points" value={points} />
        {points > 0 && (
          <p>
            <button type="submit">Wymień nagrodę</button>
          </p>
        )}
      </form>
    </>
  );
}
