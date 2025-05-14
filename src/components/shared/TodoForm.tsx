import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useApp } from "@/context";
import { firestore } from "@/firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { ListFilter, X } from "lucide-react";
import { FC, FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const TodoForm: FC = () => {
  const [text, setText] = useState<string>("");
  const { user, todos, setTodos, filterStatus, setFilterStatus } = useApp();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (todos.length > 20) {
      toast.error("You can add only 20 tasks", {
        duration: 3000,
      });
      setText("");
      return;
    }

    if (!text.trim().length) {
      toast.error("Please enter a task", {
        duration: 3000,
      });
      return;
    }

    if (!user) {
      toast.error("You must be logged in to add a task", {
        duration: 3000,
      });
      return;
    }

    try {
      const createdAt = new Date().getTime();
      const userTodosRef = collection(firestore, `todos/${user.uid}/todo`);
      const newTodoRef = await addDoc(userTodosRef, {
        text,
        completed: false,
        userId: user.uid,
        createdAt,
      });
      setFilterStatus("all");

      setTodos((todos: Todo[]) => [
        {
          id: newTodoRef.id,
          text,
          completed: false,
          createdAt: createdAt,
        },
        ...todos,
      ]);

      toast.success("Task added successfully", {
        duration: 3000,
      });
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task", {
        duration: 3000,
      });
    }

    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <Input
        placeholder="Enter a task"
        className="grow"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button type="submit" className="dark:text-white">
        Add
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="!px-2 relative">
            {(filterStatus === "completed" || filterStatus === "pending") && (
              <div className="rounded-full bg-red-500 absolute -top-1 -right-1">
                <X size={10} className="text-white" />
              </div>
            )}

            <ListFilter />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Filter by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={filterStatus}
            onValueChange={setFilterStatus}
          >
            <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="completed">
              Completed
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="pending">
              Pending
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </form>
  );
};

export default TodoForm;
