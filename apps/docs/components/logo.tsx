import React from "react";
import VercelIconDark from "@/public/vercel-icon-dark.svg";
import VercelIconLight from "@/public/vercel-icon-light.svg";
import Image from "next/image";

export const Logo = () => {
  return (
    <div className="flex items-center">
      <Image
        src={VercelIconDark}
        className="mr-2 dark:block hidden"
        alt="Vercel icon"
        width={24}
        height={24}
      />
      <Image
        src={VercelIconLight}
        className="mr-2 dark:hidden"
        alt="Vercel icon"
        width={24}
        height={24}
      />
      <span className="font-semibold">Yu-GI-Oh! Ruling AI Chatbot</span>
    </div>
  );
};
