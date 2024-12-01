import { verifyAuth } from "@/lib/auth";
import { getChildren } from "@/lib/children";
import { redirect } from "next/navigation";
import Link from "next/link";

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
            <img src={`/trainings/${child.image}`} alt={child.name} />
            <div>
              <h2>{child.name}</h2>
            </div>
          </li>
        ))}
      </ul>
      <Link href="children/add">
        <button>Add child</button>
      </Link>
    </main>
  );
}
