"use client";
import React, { useEffect, useState } from "react";
import CloseIcon from "../icons/CloseIcon";
import MenuIcon from "../icons/MenuIcon";
import { menuLinks } from "../lib/data";
import { cn } from "../lib/utils";
import Button from "./button";
import Logo from "./logo";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NavMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const user = localStorage.getItem("user");
  const { id, token, username, role } = user
    ? JSON.parse(user as unknown as string)
    : " ";
  useEffect(() => {
    router.refresh();
  }, [user]);

  return (
    <nav className="flex px-2 md:px-4 lg:px-16 justify-between items-center py-4 md:py-12">
      <div className="block md:hidden">
        {showMenu ? (
          <div
            onClick={() => setShowMenu(!showMenu)}
            className={cn(
              showMenu && "transition-all duration-700 rotate-180 ease-out"
            )}
          >
            <CloseIcon />
          </div>
        ) : (
          <div
            onClick={() => setShowMenu(!showMenu)}
            className={cn(
              showMenu &&
                "transition-all duration-700 rotate-180 ease-out hover:transition-all hover:duration-700 hover:ease-in hover:rotate-180"
            )}
          >
            <MenuIcon />
          </div>
        )}
      </div>
      <Logo />
      <ul
        className={cn(
          `hidden md:flex gap-6 lg:gap-9 list-none place-content-center`,
          showMenu &&
            "flex flex-col md:flex-row absolute md:relative h-1/2 w-[70%] left-0 top-14 z-40 bg-white md:top-0 gap-9 px-4 transition-all rotate-270  duration-1000 ease-in",
          token && "hidden"
        )}
      >
        {menuLinks.map((link, index) => (
          <Link key={index} href={link.href}>
            <li className=" text-sm lg:text-lg font-serif font-medium text-[#7D8BA2]">
              {link.name}
            </li>
          </Link>
        ))}
        <div className="block md:hidden">
          <Button text="Contact Us" primary={true} />
        </div>
      </ul>
      <div className="hidden sm:flex justify-between items-center gap-4">
        {!user && (
          <div className="hidden justify-center items-center lg:flex">
            <Link
              href={"/signup"}
              className="text-[#5138ED] text-xl font-medium"
            >
              SignUp
            </Link>
            <span className="text-2xl font-bold px-1">/</span>{" "}
            <Link
              href={"/login"}
              className="hover:text-[#5138ED]  text-xl font-medium"
            >
              Login
            </Link>
          </div>
        )}
        <Button text="Contact Us" primary={true} />
      </div>
    </nav>
  );
};

export default NavMenu;
