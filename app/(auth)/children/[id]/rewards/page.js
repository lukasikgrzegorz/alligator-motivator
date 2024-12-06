import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import RewardForm from "@/components/reward-form";

export default async function AddRewardPage({params}) {
  const result = await verifyAuth();
  const { id } = params;

  if (!result.user) {
    return redirect("/");
  }

  const userId = result.user.id;
  return (
    <main>
      <RewardForm userId={userId} childId={id} />
    </main>
  );
}
