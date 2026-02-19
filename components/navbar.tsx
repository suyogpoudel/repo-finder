import Link from "next/link";
import { IconBrandGithub, IconBrandGithubFilled } from "@tabler/icons-react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="w-[80%] mx-auto bg-card p-6 rounded-b-4xl border-b border-x shadow-sm flex justify-between items-center max-sm:w-full max-sm:rounded-none">
      <Link
        href="/"
        className="hover:text-muted-foreground transition-colors flex gap-1 items-center"
      >
        <IconBrandGithub />
        <span className="text-xl font-mono font-semibold">Repo Finder</span>
      </Link>

      <Button
        asChild
        variant="outline"
      >
        <Link
          href="https://github.com/suyogpoudel/repo-finder"
          className="flex items-center gap-1 font-mono"
          target="_blank"
        >
          <IconBrandGithubFilled />
          <span className="max-sm:hidden">See on Github</span>
        </Link>
      </Button>
    </nav>
  );
};

export default Navbar;
