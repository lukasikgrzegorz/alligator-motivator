import "../../globals.css";

export const metadata = {
  title: "Aligatorek Motywatorek",
  description: "Aplikacja motywująca",
};

export default function AuthRootLayout({ children, modal }) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
