"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createChildren } from "@/lib/children";

export async function addChild(prevState, formData) {
  const name = formData.get("name");
  const image = formData.get("image");
  const userId = formData.get("userId");

  console.log(userId);

  let errors = {};

  if (!userId) {
    errors.user = "Incorrect authentication data";
  }

  if (name.trim().length < 2) {
    errors.password = "Name must be at least 2 characters long.";
  }

  if (Object.keys(errors).length) {
    return {
      errors,
    };
  }

  try {
    createChildren(name, image.name, Number(userId));
    revalidatePath("/children");
    redirect("/children");
  } catch (error) {
    throw error;
  }
}
