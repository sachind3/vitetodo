import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useApp } from "@/context";
import { FC } from "react";

const Login: FC = ({}) => {
  const { actionLogin } = useApp();
  return (
    <div className="flex items-center justify-center relative z-20 grow">
      <Card className="w-80 bg-white/50 dark:bg-black/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-center">
            Welcome to{" "}
            <span className="text-blue-500 font-extrabold">TodoFlow</span>
          </CardTitle>
          <CardDescription className="text-slate-700 dark:text-slate-300 text-center">
            Organize, track, and complete your to-dos with ease in a seamless,
            intuitive app.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            onClick={actionLogin}
            className="w-full font-bold"
          >
            Login with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
