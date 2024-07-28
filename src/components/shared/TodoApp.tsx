import { FC } from "react";
import Header from "./Header";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const TodoApp: FC = () => {
  return (
    <div className="min-h-dvh">
      <Header />
      <div className="max-w-lg mx-auto px-4">
        <TodoForm />
        <TodoList />
      </div>
    </div>
  );
};

export default TodoApp;
