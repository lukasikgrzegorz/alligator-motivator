"use server";
import { redirect } from "next/navigation";

import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { createUser, getUserByEmail } from "@/lib/user";
import { createAuthSessions, destroySession } from "@/lib/auth";

export async function signup(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  let errors = {};

  if (!email.includes("@")) {
    errors.email = "Podaj poprawny adres email.";
  }

  if (password.trim().length < 8) {
    errors.password = "Hasło musi mieć co najmniej 8 znaków.";
  }

  if (Object.keys(errors).length) {
    return {
      errors,
    };
  }

  const hashedPassword = hashUserPassword(password);
  try {
    const id = createUser(email, hashedPassword);
    createAuthSessions(id);
    redirect("/children");
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return {
        errors: {
          email:
            "Wygląda na to, że konto dla podanego adresu email już istnieje.",
        },
      };
    }
    throw error;
  }
}

export async function login(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const existingUser = getUserByEmail(email);

  if (!existingUser) {
    return {
      errors: {
        email: "Nie można uwierzytelnić użytkownika, sprawdź swoje dane.",
      },
    };
  }

  const isValidPassword = verifyPassword(existingUser.password, password);

  if (!isValidPassword) {
    return {
      errors: {
        password: "Could not authenticate user, please chek your credentials.",
      },
    };
  }

  createAuthSessions(existingUser.id);
  redirect("/children");
}

export async function auth(mode, prevState, formData) {
  if (mode === "login") {
    return login(prevState, formData);
  }
  return signup(prevState, formData);
}

export async function logout() {
  await destroySession();
  redirect("/");
}
