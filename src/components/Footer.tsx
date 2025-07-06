import Image from "next/image";
import Link from "next/link";
import React from "react";
import Icon from "./Icon";

const Footer = () => {
  return (
    <footer className="bg-default mt-8 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-800 sm:text-center dark:text-gray-400">
          © 2025{" "}
          <Link
            href="https://nabilbelfki.com"
            className="hover:underline"
          >
            Nabil Belfki
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
