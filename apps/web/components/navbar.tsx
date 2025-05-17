import { ModeToggle } from "@repo/ui/components/mode-toggle";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 border-b w-full bg-background z-10">
      <div className="flex h-16 items-center px-4 w-full">
        <div className="flex items-center gap-2 font-bold text-xl">
          <span>Yu-Gi-Oh! Ruling Chatbot</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
