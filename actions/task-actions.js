"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createTask, deleteTask as deleteTaskFromDb } from "@/lib/tasks";

export async function addTask(prevState, formData) {
  const userId = formData.get("userId");
  const childId = formData.get("childId");
  const name = formData.get("name");
  const imageUrl = formData.get("imageUrl");
  const points = formData.get("points");
  const isRecurring = Number(formData.get("is_recurring"));
  let startDate = formData.get("start_date");
  let endDate = formData.get("end_date");

  let errors = {};

  if (!userId) {
    errors.user = "Niepoprawne dane uwierzytelniające.";
  }

  if (name.trim().length < 2) {
    errors.name = "Nazwa musi mieć co najmniej 2 znaki.";
  }

  if (isRecurring === 0) {
    if (!startDate && !endDate) {
      errors.dates = "Uzupełnij pola daty rozpoczęcia i zakończenia zadania.";
    }

    if (!startDate && endDate) {
      errors.dates = "Musisz podać zarówno datę rozpoczęcia, jak i zakończenia.";
    } else if (startDate && !endDate) {
      errors.dates = "Musisz podać zarówno datę rozpoczęcia, jak i zakończenia.";
    } else if (
      startDate &&
      endDate &&
      new Date(startDate) > new Date(endDate)
    ) {
      errors.dates = "Data zakończenia musi być późniejsza niż data rozpoczęcia.";
    }
  }

  if (isRecurring === 1) {
    startDate = "";
    endDate = "";
  }

  if (Object.keys(errors).length) {
    console.log(errors);
    return {
      errors,
    };
  }

  try {
    createTask(
      name,
      imageUrl,
      points,
      userId,
      childId,
      isRecurring,
      startDate,
      endDate
    );
    revalidatePath(`/children/${childId}`);
    redirect(`/children/${childId}?mode=parent`);
  } catch (error) {
    throw error;
  }
}

export async function deleteTask(prevState, formData) {
  const userId = formData.get("userId");
  const childId = formData.get("childId");
  const id = formData.get("activityId");

  let errors = {};

  if (!userId) {
    errors.user = "Niepoprawne dane uwierzytelniające.";
  }

  if (Object.keys(errors).length) {
    return {
      errors,
    };
  }

  try {
    deleteTaskFromDb(id, userId);
    revalidatePath(`/children/${childId}`);
    redirect(`/children/${childId}?mode=parent`);
  } catch (error) {
    throw error;
  }
}

