"use client";

import React, { useState } from "react";
import {
  Button,
  Navbar as NavbarContainer,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  // NavbarMenuToggle,
  // NavbarMenu,
  // NavbarMenuItem,
} from "@nextui-org/react";
import Icon from "../Icon";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";

import Link from "next/link";
import { navLinks } from "./SideNav";
import NavbarProfile from "./NavbarProfile";
import SearchInput from "../search/SearchInput";
import LoadingBar from "react-top-loading-bar";
import { setProgress } from "@/redux/commonSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { authStatus } = useAppSelector((state) => state.auth);
  const { progress } = useAppSelector((state) => state.common);

  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => dispatch(setProgress(0))}
      />
      <NavbarContainer
        isBordered
        isBlurred
        // onMenuOpenChange={setIsMenuOpen}
        // isMenuOpen={isMenuOpen}
        maxWidth="full"
        classNames={{ wrapper: "max-md:px-2" }}
      >
        <NavbarContent>
          {/* <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          /> */}
          <NavbarBrand className="basis-0 grow-0">
            <Button
              href={"/"}
              as={Link}
              variant="solid"
              isIconOnly
              aria-label="next-blog home page"
              radius="sm"
              className=" bg-black/90 text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="306" height="306" viewBox="0 0 306 306" fill="none">
                <rect width="306" height="306" rx="50" fill="#011A49"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M91.4144 208.122H52L114.108 98H145.4L146.834 137.892H148.267L170.96 98.2389H230.679C259.822 97.5222 266.51 137.176 225.185 152.225C250.505 157.719 243.339 201.433 198.192 207.644H116.735L115.302 167.513H114.108L91.4144 208.122ZM207.985 141.237H188.875L200.341 120.932H210.852C221.123 120.693 228.29 134.309 207.985 141.237ZM191.503 182.562H165.465L179.081 158.674H198.908C210.135 158.436 211.807 177.784 191.503 182.562Z" fill="white"/>
              </svg>
            </Button>
          </NavbarBrand>
          {/* ---SEARCH BAR--- */}
          <div className="max-md:hidden">
            <SearchInput />
          </div>
        </NavbarContent>
        {/* ===AUTH USER ACCESS=== */}
        {authStatus ? (
          <NavbarProfile />
        ) : (
          <NavbarContent className="md:gap-4 gap-2" justify="end">
            <NavbarItem className="md:hidden">
              <Button
                as={Link}
                href={"/search"}
                variant="light"
                color="default"
                radius="sm"
                isIconOnly
              >
                <Icon name="search" strokeWidth={1.25} />
              </Button>
            </NavbarItem>

            <NavbarItem>
              <Button
                as={Link}
                href={"/signin"}
                variant="light"
                color="primary"
                radius="sm"
                className="max-md:hidden"
              >
                Sign in
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                href={"/signup"}
                variant="ghost"
                radius="sm"
                color="primary"
                className="border-1.5"
                role="link"
              >
                Create account
              </Button>
            </NavbarItem>
          </NavbarContent>
        )}
        {/* <NavbarMenu>
          {navLinks.map((navMenu) => (
            <NavbarMenuItem key={navMenu.id}>
              <Button
                href="/"
                className="justify-start"
                as={Link}
                variant="light"
                fullWidth
              >
                <span>{navMenu.label}</span>
              </Button>
            </NavbarMenuItem>
          ))}
        </NavbarMenu> */}
      </NavbarContainer>
    </>
  );
};

export default Navbar;
