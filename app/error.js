"use client";

import Link from "next/link";

export default function CustomError() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Wystąpił błąd</h1>
      <p>Przejdź do strony głównej</p>
      <Link href="/">Strona główna</Link>
    </div>
  );
}
