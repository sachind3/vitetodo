interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

interface ContextProps {
  authLoading: boolean;
  user: User | null;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  actionLogin: () => void;
  actionLogout: () => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
}
