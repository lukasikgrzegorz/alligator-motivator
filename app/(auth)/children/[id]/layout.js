import "../../../globals.css";
import { verifyAuth } from "@/lib/auth";
import { getChildren } from "@/lib/children";
import Header from "@/components/header";

export const metadata = {
  title: "Aligatorek Motywatorek",
  description: "Aplikacja motywująca",
};

export default async function AuthRootLayout({ children, modal, params}) {
  const { id } = params;
  const result = await verifyAuth();
  const userId = result?.user?.id || null;
  const childrenList = getChildren(userId);
  const child = childrenList.find((child) => child.id === id);

  return (
    <>
      {userId && child ? (
        <Header childrenList={childrenList} currentChildId={id} />
      ) : (
        <></>
      )}
      {modal}
      {children}
    </>
  );
}
