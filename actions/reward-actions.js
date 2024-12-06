"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createReward } from "@/lib/rewards";
import { randomBytes } from "node:crypto";
import { S3 } from "@aws-sdk/client-s3";

export async function addReward(prevState, formData) {
  const name = formData.get("name");
  const imageUrl = formData.get("imageUrl");
  const points = formData.get("points");
  const userId = formData.get("userId");
  const childId = formData.get("childId"); // Dodano childId
  let imageName = "";

  let errors = {};

  if (!userId) {
    errors.user = "Incorrect authentication data";
  }

  if (name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters long.";
  }


  if (Object.keys(errors).length) {
    return {
      errors,
    };
  }

  try {
    await createReward(name, imageUrl, points, userId, childId);
    revalidatePath(`/children/${childId}`);
    redirect(`/children/${childId}`);
  } catch (error) {
    throw error;
  }
}
