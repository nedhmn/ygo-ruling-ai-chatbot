import { Navbar as NextraNavbar } from "nextra-theme-docs";
import { Logo } from "@/components/logo";
import { METADATA } from "@/lib/constants";

export const Navbar = (
  <NextraNavbar logo={<Logo />} projectLink={METADATA.githubLink} />
);
