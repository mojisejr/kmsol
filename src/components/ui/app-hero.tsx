import React from "react";
import { BsTwitterX, BsTiktok } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import Link from "next/link";

export default function AppHero() {
  return (
    <div className="w-full flex mt-[calc(3vh+20px)] justify-center items-center flex-col leading-none">
      <span className="flex text-[60px] sm:text-[calc(10vw+25px)] font-bold gap-2">
        <h1>KING</h1>
        <h1 className="text-accent">KONG</h1>
      </span>
      <span className="flex text-[50px] sm:text-[calc(8vw+25px)] font-semibold gap-6">
        <h1>FAN</h1>
        <h1>MEME</h1>
      </span>

      <div className="mt-5 flex flex-col gap-4 justify-center">
        <Link
          href="/market"
          className="btn btn-accent rounded-md text-accent-content"
        >
          Buy $KKNG
        </Link>
        <p className="text-xl">Contract: xxxxxxxxxxxxxxxxxxx</p>
      </div>

      <div className="flex justify-center gap-10 my-32 sm:my-24 md:my-16 text-[32px] sm:text-[calc(3vw+15px)]">
        <BsTwitterX />
        <FaTelegramPlane />
        <BsTiktok />
      </div>
    </div>
  );
}
