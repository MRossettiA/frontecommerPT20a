"use client";
import Image from 'next/image';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import categoriesToPreLoad from "@/helpers/preLoadCategories";
import { useAuth } from "@/context/AuthContext";
import Search from "../Search/search";

const Navbar = () => {
  const { userData } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowSize, setWindowSize] = useState([1200, 800]);

  useEffect(() => {
    
    const windowSizeHandler = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
      if (window.innerWidth <720) { setIsMenuOpen(false)   };
    }
   
    windowSizeHandler();

    
    window.addEventListener("resize", windowSizeHandler);

    
    return () => {
      window.removeEventListener("resize", windowSizeHandler);
    };
  }, []);
  return (
    <nav className="flex flex-col   bg-indigo-200 border-2 border-black rounded-lg p-4">
      <div className="flex flex-row justify-between w-full mb-4">
        <div className="relative">
          <div
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="ml-auto cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <div className="w-4 h-0.5 bg-black my-1"></div>
            <div className="w-4 h-0.5 bg-black my-1"></div>
            <div className="w-4 h-0.5 bg-black my-1"></div>
          </div>
          {isMenuOpen && (
            <div className="absolute  left-0 w-auto bg-white rounded-lg p-2 shadow-lg z-10">
              <div className="flex flex-col">
                {categoriesToPreLoad.map((category) => (
                  <Link key={category.id} href={`/category/${category.id}`}>
                    <label className="text-xs font-medium block py-1 cursor-pointer hover:bg-gray-200">
                      {category.name}
                    </label>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center items-center">
          <Link href="/">
            <div className="flex ">
            <Image
  src="/logo/logo-removebg-preview.png"
  alt="X Logo"
  width={100}
  height={100} 
/>
              <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900">
                {" "}
                ELECTRO OUTLET{" "}
              </p>
            </div>
          </Link>
        </div>
        <div className="flex justify-end items-center">
          <div>
            {!userData?.token ? (
              <Link href="/login">
                <p>Sign In</p>
              </Link>
            ) : (
              <Link href="/dashboard">
                <p>Welcome: {userData.userData.name}</p>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="w-full">
        <Search />
      </div>
    </nav>
  );
};

export default Navbar;
