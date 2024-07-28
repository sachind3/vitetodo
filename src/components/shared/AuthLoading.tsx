import { LoaderCircle } from "lucide-react";
import { FC } from "react";

const AuthLoading: FC = ({}) => {
  return (
    <div className="fixed z-30 h-dvh w-full flex items-center justify-center gap-2 bg-background">
      <div className="text-xl font-extrabold">
        Todo <span className="text-blue-600">Flow</span>
      </div>
      <div>
        <LoaderCircle className="animate-spin" />{" "}
      </div>
    </div>
  );
};

export default AuthLoading;
