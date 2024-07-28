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

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  const { user, actionLogout } = useApp();
  return (
    <header className="bg-white/5 backdrop-blur sticky top-0 left-0 w-full border-b border-b-slate-200 shadow-sm py-2 z-50">
      <div className="max-w-lg mx-auto px-4 flex items-center justify-between">
        <div className="text-xl font-extrabold">
          Todo <span className="text-blue-600">Flow</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
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
      </div>
    </header>
  );
};

export default Header;
