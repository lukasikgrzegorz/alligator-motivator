import "../../globals.css";
import { logout } from "@/actions/auth-actions";
import { FaSignOutAlt } from "react-icons/fa";

export const metadata = {
  title: "Aligatorek Motywatorek",
  description: "Aplikacja motywująca",
};

export default function AuthRootLayout({ children, modal }) {
  return (
    <>
      <header id="auth-header">
        {/* <form action={logout}>
          <button>
            <FaSignOutAlt size={20} />
          </button>
        </form> */}
      </header>
      {modal}
      {children}
    </>
  );
}
