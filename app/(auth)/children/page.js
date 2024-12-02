import { verifyAuth } from "@/lib/auth";
import { getChildren } from "@/lib/children";
import { redirect } from "next/navigation";
import Link from "next/link";

const AWS_REGION = process.env.AWS_REGION;
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

export default async function TrainingPage() {
  const result = await verifyAuth();

  if (!result.user) {
    return redirect("/");
  }

  const userId = result.user.id;
  const userChildren = getChildren(userId);

  return (
    <main>
      <h1>Children</h1>
      <ul id="training-sessions">
        {userChildren.map((child) => (
          <li key={child.id}>
            <Link href={`children/${child.id}`}>
              <img
                src={`https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${child.image}`}
                alt={child.name}
              />
              <div>
                <h2>{child.name}</h2>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="children/add">
        <button>Add child</button>
      </Link>
    </main>
  );
}
