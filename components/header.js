"use client";
import { useState, useRef } from "react";
import { useEffect } from "react";
import classes from "./header.module.css";
import Image from "next/image";
import { logout } from "@/actions/auth-actions";
import { FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";

export default function Header({ childrenList, currentChildId }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={classes["header"]}>
      <div className={classes["avatar-container"]} onClick={toggleMenu}>
        <Image
          fill
          className={classes["image"]}
          src={`${
            childrenList.find((child) => child.id === currentChildId).image
          }`}
        />
      </div>

      {isMenuOpen && (
        <ul className={classes["menu"]} ref={menuRef}>
          {childrenList
            .filter((child) => child.id !== currentChildId)
            .map((child) => (
              <li key={child.id}>
                <Link
                  className={classes["link"]}
                  href={`/children/${child.id}?mode=parent`}>
                  <div className={classes["image-container"]}>
                    <Image
                      className={classes["image"]}
                      fill
                      src={child.image}
                    />
                  </div>
                  {child.name}
                </Link>
              </li>
            ))}
          <li>
            <Link href={`/children`}>Zarządzaj profilami</Link>
          </li>
          <li>
            <form action={logout}>
              <button className={classes["button"]}>
                <FaSignOutAlt size={15} />
                Wyloguj
              </button>
            </form>
          </li>
        </ul>
      )}
    </header>
  );
}
