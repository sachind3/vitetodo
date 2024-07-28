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
    <div className="min-h-dvh flex items-center justify-center p-4">
      <Card className="w-80">
        <CardHeader>
          <CardTitle className="text-center">
            Welcome to{" "}
            <span className="text-blue-600 font-extrabold">TodoFlow</span>
          </CardTitle>
          <CardDescription>
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
