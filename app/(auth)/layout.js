import "../globals.css";

import { logout } from "@/actions/auth-actions";

export const metadata = {
  title: "Aligatorek Motywatorek",
  description: "Aplikacja motywująca",
};

export default function AuthRootLayout({ children }) {
  return (
    <>
      <header id="auth-header">
        <p>
          <img width={70} src="/images/logo.png" alt="A aligator icon" />
        </p>
        <form action={logout}>
          <button>Wyloguj</button>
        </form>
      </header>
      {children}
    </>
  );
}
