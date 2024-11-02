"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { UserData } from "@/context/UserContext";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu
  const { user } = UserData();

  const handleCloseMobileMenu = () => {
    setTimeout(() => {
      setMenuOpen(false);
    }, 1000);
  };

  return (
    <nav className="w-full mx-auto flex items-center justify-between py-2 px-4">
      {/* Logo */}
      <div className="LogoDiv flex items-center justify-center gap-2">
        <div className="rounded-full h-10 w-10 overflow-hidden">
          <Image
            src={
              "https://i.pinimg.com/236x/29/3b/56/293b56f77f8e5ee04dd98f9cb38e686f.jpg"
            }
            alt={"user image"}
            className="h-full w-full"
            width={30}
            height={30}
          />
        </div>
        <h1 className="font-semibold">HMK Blogs</h1>
      </div>

      {/* Desktop Links */}
      <div className="LinkDiv hidden sm:flex items-center justify-center gap-3">
        <Link className="Link" href={"/"}>
          Home
        </Link>
        <Link href={"/blog"} className="Link">
          Blogs
        </Link>
        <Link href={"/about"} className="Link">
          About Us
        </Link>
      </div>

      {/* Login/Signup or Profile */}
      {user === null || user === undefined ? (
        <div className="LoginSignUpDiv hidden sm:flex">
          <button className="py-2 px-5 hover:scale-95 duration-300 font-semibold bg-gray-600 mr-4 rounded-lg">
            <Link href={"/login"}>Login</Link>
          </button>
          <button className="py-2 px-3 hover:scale-95 duration-300 font-semibold bg-gray-100 text-black rounded-lg">
            <Link href={"/sign_up"}>Sign Up</Link>
          </button>
        </div>
      ) : (
        <Link href={`/users/${user?._id}`}>
          <div className="LogoDiv hidden sm:flex cursor-pointer items-center flex-col justify-center gap-2">
            <div className="rounded-[50%] overflow-hidden">
              <Image
                src={user?.profilePicture}
                width={50}
                alt={"user image"}
                height={50}
              />
            </div>
            <h1 className="font-semibold">{user?.name}</h1>
          </div>
        </Link>
      )}

      {/* Hamburger Icon for Mobile */}
      <div className="sm:hidden flex items-center">
        <button onClick={() => setMenuOpen(true)} aria-label="Toggle menu">
          <AiOutlineMenu size={24} />
        </button>
      </div>

      {/* Mobile Menu Optoins */}
      <div
        onClick={handleCloseMobileMenu}
        className={`  ${
          menuOpen ? "top-2" : "-top-[200px]"
        } rounded-bl-xl  duration-500 bg-[#000] pb-2 cursor-pointer px-3 z-50 absolute   right-0`}
      >
        <div className="LinkDiv  flex-col  flex items-center justify-center gap-3">
          <Link className="Link" href={"/"}>
            Home
          </Link>
          <span
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-2"
          >
            <AiOutlineClose size={24} />
          </span>
          <Link href={"/blog"} className="Link">
            Blogs
          </Link>
          <Link href={"/about"} className="Link">
            About Us
          </Link>
        </div>

        {/* Login/Signup or Profile */}
        {user === null || user === undefined ? (
          <div className="LoginSignUpDiv mt-2 flex">
            <button className="py-2 px-5 hover:scale-95 duration-300 font-semibold bg-gray-600 mr-4 rounded-lg">
              <Link href={"/login"}>Login</Link>
            </button>
            <button className="py-2 px-3 hover:scale-95 duration-300 font-semibold bg-gray-100 text-black rounded-lg">
              <Link href={"/sign_up"}>Sign Up</Link>
            </button>
          </div>
        ) : (
          <Link href={`/users/${user?._id}`}>
            <div className="LogoDiv mt-5 flex cursor-pointer items-center justify-center gap-2">
              <div className="rounded-[50%] overflow-hidden">
                <Image
                  src={user?.profilePicture}
                  width={20}
                  alt={"user image"}
                  height={20}
                />
              </div>
              <h1 className="font-semibold">{user?.name}</h1>
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
