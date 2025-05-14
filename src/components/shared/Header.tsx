import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useApp } from "@/context";
import { LogOut } from "lucide-react";
import { FC } from "react";
import { ModeToggle } from "../mode-toggle";

const Header: FC = () => {
  const { user, actionLogout } = useApp();

  return (
    <header className="bg-white/50 dark:bg-black/50 backdrop-blur sticky top-0 left-0 w-full border-b border-b-slate-200 dark:border-b-slate-800 shadow-sm py-2 z-50">
      <div className="max-w-lg mx-auto px-4 flex items-center justify-between gap-3">
        <div className="text-xl font-extrabold">
          Todo <span className="text-blue-500">Flow</span>
        </div>
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none ml-auto">
              <Avatar>
                <AvatarImage
                  src={user?.photoURL || "https://github.com/shadcn.png"}
                  alt={user?.displayName || ""}
                  referrerPolicy="no-referrer"
                />
                <AvatarFallback className="bg-primary text-primary-background">
                  {user?.displayName?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="block pointer-events-none">
                <div>{user?.displayName}</div>
                <div>{user?.email}</div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="bg-red-500 text-white cursor-pointer"
                onClick={actionLogout}
              >
                Logout <LogOut size={14} className="ml-2" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
