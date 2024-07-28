import { LoaderCircle } from "lucide-react";
import Login from "./components/shared/Login";
import TodoApp from "./components/shared/TodoApp";
import { useApp } from "./context";

const App = () => {
  const { authLoading, user } = useApp();

  if (authLoading) {
    return (
      <div className="min-h-dvh flex items-center justify-center gap-3">
        <div className="text-xl font-extrabold">
          Todo <span className="text-blue-600">Flow</span>
        </div>
        <div>
          <LoaderCircle className="animate-spin" />{" "}
        </div>
      </div>
    );
  }

  return user ? <TodoApp /> : <Login />;
};

export default App;
