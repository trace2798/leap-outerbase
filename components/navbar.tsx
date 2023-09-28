import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { FC } from "react";
import { Button } from "./ui/button";

const font = Poppins({ weight: "600", subsets: ["latin"] });
interface navbarProps {}

export const Navbar: FC<navbarProps> = ({}) => {
  return (
    <>
      <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 h-16 border-b border-primary/10 dark:bg-zinc-900">
        <div className="flex items-center">
          <Link href="/">
            <h1
              className={cn(
                "text-base md:block md:text-xl lg:text-3xl font-bold text-primary",
                font.className
              )}
            >
              Outerbase LeapAI Integration
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-x-3">
          <Link href="/image-request">
            <Button variant="ghost">Generate Image</Button>
          </Link>
        </div>
      </div>
    </>
  );
};
