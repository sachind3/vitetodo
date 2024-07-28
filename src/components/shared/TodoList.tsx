import { useApp } from "@/context";
import { firestore } from "@/firebase/config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { FC, useCallback, useEffect } from "react";
import TodoItem from "./TodoItem";

const TodoList: FC = () => {
  const { user, todos, setTodos } = useApp();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const todosRef = collection(firestore, `todos/${user.uid}/todo`);
        const todosQuery = query(todosRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(todosQuery);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Todo, "id">),
        }));
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchData();
  }, [user, setTodos]);

  const handleDelete = useCallback(
    async (id: string) => {
      if (!user) return;
      try {
        await deleteDoc(doc(firestore, `todos/${user.uid}/todo/${id}`));
        setTodos((todos) => todos.filter((todo) => todo.id !== id));
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    },
    [user, setTodos]
  );

  const handleToggle = useCallback(
    async (id: string, completed: boolean) => {
      if (!user) return;
      try {
        await updateDoc(doc(firestore, `todos/${user.uid}/todo/${id}`), {
          completed: !completed,
        });
        setTodos((todos) =>
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      } catch (error) {
        console.error("Error toggling todo:", error);
      }
    },
    [user, setTodos]
  );

  return (
    <div>
      {todos.length ? (
        <div className="space-y-2">
          {todos.map((todo: Todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleDelete={handleDelete}
              handleToggle={handleToggle}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white/50 backdrop-blur backdrop:blur-sm p-3 rounded flex w-full items-start justify-start gap-2 border border-slate-200 relative">
          No todos found
        </div>
      )}
    </div>
  );
};

export default TodoList;
