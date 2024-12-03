import { verifyAuth } from "@/lib/auth";
import { getChildren } from "@/lib/children";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

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
      <h2>Wybierz dziecko</h2>
      <ul id="children">
        {userChildren.map((child) => (
          <li key={child.id}>
            <Link href={`children/${child.id}`}>
              <div className="image-container">
                <Image
                  src={`https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${child.image}`}
                  fill
                  alt={child.name}
                />
              </div>

              <div>
                <h2>{child.name}</h2>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="children/add">
        <button>Dodaj dziecko</button>
      </Link>
    </main>
  );
}
