"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { WalletButton } from "../solana/solana-provider";
import { IoMenu } from "react-icons/io5";

export default function Navbar({
  links,
}: {
  links: { label: string; path: string }[];
}) {
  const pathname = usePathname();
  return (
    <div className="navbar text-neutral-content flex-row">
      <div className="flex-1">
        <Link className="normal-case text-xl" href="/">
          <div className="flex items-center space-x-2 mr-3">
            <figure className="max-w-14">
              <Image
                src="/images/coin-front-no-bg.png"
                alt="kingkong-logo"
                width={1000}
                height={700}
              />
            </figure>
            <h1 className="hidden md:block">KINGKONG</h1>
          </div>
        </Link>
        <ul className="menu menu-horizontal px-1 space-x-3 text-xl hidden sm:flex">
          {links.map(({ label, path }) => (
            <li key={path}>
              <Link
                className={pathname.startsWith(path) ? "active" : ""}
                href={path}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-none gap-2">
        <WalletButton />
        <div className="dropdown dropdown-end sm:hidden">
          <div tabIndex={0} role="button" className="btn m-1">
            <IoMenu size={24} />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            {links.map(({ label, path }) => (
              <li key={path}>
                <Link
                  className={pathname.startsWith(path) ? "active" : ""}
                  href={path}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
