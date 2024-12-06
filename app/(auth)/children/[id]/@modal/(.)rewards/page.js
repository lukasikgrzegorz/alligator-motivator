import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import RewardForm from "@/components/reward-form";
import Modal from "@/components/modal";

export default async function AddRewardModalPage({ params }) {
  const result = await verifyAuth();
  const { id } = params;

  if (!result.user) {
    return redirect("/");
  }

  const userId = result.user.id;
  return (
    <Modal>
      <RewardForm userId={userId} childId={id} />
    </Modal>
  );
}
