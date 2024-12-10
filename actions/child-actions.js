"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createChildren, updatePoints } from "@/lib/children";
import { randomBytes } from "node:crypto";
import { S3 } from "@aws-sdk/client-s3";


export async function addChild(prevState, formData) {
  const name = formData.get("name");
  const imageUrl = formData.get("imageUrl");
  const userId = formData.get("userId");

  let errors = {};

  if (!userId) {
    errors.user = "Niepoprawne dane uwierzytelniające.";
  }

  if (name.trim().length < 2) {
    errors.password = "Nazwa musi mieć co najmniej 2 znaki.";
  }

  if (Object.keys(errors).length) {
    return {
      errors,
    };
  }

  try {
    createChildren(name, imageUrl, userId);
    revalidatePath("/children");
    redirect("/children");
  } catch (error) {
    throw error;
  }
}

export async function updateChildPoints(prevState, formData) {
  const id = formData.get("childId");
  const userId = formData.get("userId");
  const points = Number(formData.get("points"));
  let errors = {};

  if (!userId) {
    errors.user = "Incorrect authentication data";
  }

  if (!id) {
    errors.id = "Child ID is required.";
  }

  if (typeof points !== "number" || points < 0) {
    errors.points = "Points must be a non-negative number.";
  }

  if (Object.keys(errors).length) {
    console.log(errors);
    return {
      errors,
    };
  }

  try {
    updatePoints(id, userId, points);
    revalidatePath(`/children/${id}`);
    redirect(`/children/${id}`);
  } catch (error) {
    throw error;
  }
}
