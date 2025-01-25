import { Github } from "lucide-react";
import { ModeToggle } from "./ThemeToggle";

const Footer = () => {
  return (
    <div className="flex w-full items-center justify-center mt-5 flex-shrink-0 space-x-3">
      <a href="https://github.com/potakaaa/to-do-django">
        <Github className="size-6" />
      </a>
      <ModeToggle />
    </div>
  );
};

export default Footer;
