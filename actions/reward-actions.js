"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createReward } from "@/lib/rewards";

export async function addReward(prevState, formData) {
  const name = formData.get("name");
  const imageUrl = formData.get("imageUrl");
  const points = formData.get("points");
  const userId = formData.get("userId");
  const childId = formData.get("childId"); 

  let errors = {};

  if (!userId) {
    errors.user = "Niepoprawne dane uwierzytelniające.";
  }

  if (name.trim().length < 2) {
    errors.name = "Nazwa musi mieć co najmniej 2 znaki.";
  }


  if (Object.keys(errors).length) {
    return {
      errors,
    };
  }

  try {
    createReward(name, imageUrl, points, userId, childId);
    revalidatePath(`/children/${childId}`);
    redirect(`/children/${childId}`);
  } catch (error) {
    throw error;
  }
}
