import { verifyAuth } from "@/lib/auth";
import { getChildren } from "@/lib/children";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaUserPlus, FaPencilAlt, FaCheck } from "react-icons/fa";
import classes from "./page.module.css";

export default async function ChildrenPage({ searchParams }) {
  const result = await verifyAuth();

  if (!result.user) {
    return redirect("/");
  }

  const pageMode = searchParams.mode || null;

  const userId = result.user.id;
  const userChildren = getChildren(userId);

  return (
    <main className={classes["container"]}>
      <h1 className={classes["title"]}>Kogo dziś motywujesz?</h1>
      <ul id="children" className={classes["list"]}>
        {userChildren.map((child) => (
          <li key={child.id}>
            <Link
              className={classes["link"]}
              href={
                pageMode === "edit"
                  ? `/children/${child.id}/edit`
                  : `/children/${child.id}?mode=parent`
              }>
              <div className={classes["image-container"]}>
                <Image
                  className={`${classes["image"]} ${
                    pageMode === "edit" ? classes["transparent"] : ""
                  }`}
                  src={child.image}
                  fill
                  alt={child.name}
                />
                <div className={classes["image-edit"]}>
                  {pageMode === "edit" ? <FaPencilAlt size={60} /> : ""}
                </div>
              </div>
              <h2 className={classes["name"]}>{child.name} </h2>
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
      {pageMode === "edit" ? (
        <Link className={classes["button-wrapper"]} href={`/children`}>
          <button className={classes["button"]}>
            <FaCheck size={15} />
            Gotowe
          </button>
        </Link>
      ) : (
        <Link
          className={classes["button-wrapper"]}
          href={`/children?mode=edit`}>
          <button className={classes["button"]}>
            <FaPencilAlt size={15} /> Zarządzaj profilami
          </button>
        </Link>
      )}
    </main>
  );
}
