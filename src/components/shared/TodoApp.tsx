import { FC } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const TodoApp: FC = () => {
  return (
    <div className="relative z-20 grow pb-4">
      <div className="max-w-lg mx-auto p-4 bg-white/50 dark:bg-black/50 rounded mb-2">
        <TodoForm />
      </div>
      <div className="max-w-lg mx-auto px-4">
        <TodoList />
      </div>
    </div>
  );
};

export default TodoApp;
