import { verifyAuth } from "@/lib/auth";
import { getChildren } from "@/lib/children";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaUserPlus } from "react-icons/fa";
import classes from "./page.module.css";


export default async function ChildrenPage() {
  const result = await verifyAuth();

  if (!result.user) {
    return redirect("/");
  }

  const userId = result.user.id;
  const userChildren = getChildren(userId);

  return (
    <main className={classes["container"]}>
      <h1 className={classes["title"]}>Kogo dziś motywujesz?</h1>
      <ul id="children" className={classes["list"]}>
        {userChildren.map((child) => (
          <li key={child.id}>
            <Link className={classes["link"]} href={`children/${child.id}?mode=parent`}>
              <div className={classes["image-container"]}>
                <Image
                  className={classes["image"]}
                  src={child.image}
                  fill
                  alt={child.name}
                />
              </div>
              <h2 className={classes["name"]}>{child.name}</h2>
            </Link>
          </li>
        ))}
        {userChildren.length < 4 && (
          <li key="add-new">
            <Link className={classes["link"]} href="children/add">
              <button className={classes["add-button"]}>
                <FaUserPlus size={60} />
              </button>
              <h2 className={classes["name"]}>Dodaj</h2>
            </Link>
          </li>
        )}
      </ul>
    </main>
  );
}
