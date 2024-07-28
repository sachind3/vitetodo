import { useApp } from "@/context";
import { firestore } from "@/firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { FC, FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const TodoForm: FC = () => {
  const [text, setText] = useState<string>("");
  const { user, setTodos } = useApp();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

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
        createdAt,
      });

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
    <form onSubmit={handleSubmit} className="flex gap-2 w-full my-4">
      <Input
        placeholder="Enter a task"
        className="grow"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button type="submit">Add</Button>
    </form>
  );
};

export default TodoForm;
