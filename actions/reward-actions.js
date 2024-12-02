"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createReward } from "@/lib/rewards";
import { randomBytes } from "node:crypto";
import { S3 } from "@aws-sdk/client-s3";

const AWS_REGION = process.env.AWS_REGION;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

const s3 = new S3({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

export async function addReward(prevState, formData) {
  const name = formData.get("name");
  const image = formData.get("image");
  const description = formData.get("description");
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

  if (image.size > 0) {
    const extension = image.name.split(".").pop();
    imageName = `${randomBytes(16).toString("hex")}.${extension}`;
    const bufferedImage = await image.arrayBuffer();
    await s3.putObject({
      Bucket: AWS_BUCKET_NAME,
      Key: imageName,
      Body: Buffer.from(bufferedImage),
      ContentType: image.type,
    });
  }

  if (Object.keys(errors).length) {
    return {
      errors,
    };
  }

  try {
    await createReward(name, imageName, description, points, userId, childId);
    revalidatePath(`/children/${childId}`);
    redirect(`/children/${childId}`);
  } catch (error) {
    throw error;
  }
}
