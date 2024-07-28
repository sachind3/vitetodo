import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Trash } from "lucide-react";
import { FC } from "react";
import { Button } from "../ui/button";

interface TodoItemProps {
  todo: Todo;
  handleDelete: (id: string) => void;
  handleToggle: (id: string, completed: boolean) => void;
}

const TodoItem: FC<TodoItemProps> = ({ todo, handleDelete, handleToggle }) => {
  return (
    <motion.div
      layout
      className="bg-white/50 backdrop-blur backdrop:blur-sm p-3 rounded flex w-full items-start justify-start gap-2 border border-slate-200 relative"
    >
      <div
        onClick={() => handleToggle(todo.id, todo.completed)}
        className={cn(
          "w-5 h-5 rounded grid place-content-center shrink-0 cursor-pointer",
          todo.completed ? "bg-blue-500" : "bg-gray-200"
        )}
      >
        {todo.completed && <Check size={16} color="white" />}
      </div>
      <div className="grow">
        <div className={todo.completed ? "line-through" : ""}>{todo.text}</div>
        <div className="text-xs">{new Date(todo.createdAt).toDateString()}</div>
      </div>
      <div>
        <Button
          size="icon"
          variant="destructive"
          onClick={() => handleDelete(todo.id)}
        >
          <Trash size={16} />
        </Button>
      </div>
    </motion.div>
  );
};

export default TodoItem;
