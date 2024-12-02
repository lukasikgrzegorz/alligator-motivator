import "./globals.css";

export const metadata = {
  title: "Aligatorek Motywatorek",
  description: "Aplikacja motywująca",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
