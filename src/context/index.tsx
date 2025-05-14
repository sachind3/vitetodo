import { firebaseAuth, firestore } from "@/firebase/config";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AppContext = createContext<ContextProps>({
  authLoading: false,
  user: null,
  todos: [],
  setTodos: () => {},
  actionLogin: () => {},
  actionLogout: () => {},
  filterStatus: "all",
  setFilterStatus: () => {},
});

export const AppState = ({ children }: { children: ReactNode }) => {
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const actionLogin = async () => {
    try {
      setAuthLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(firebaseAuth, provider);
      const newuser = result.user;
      const userRef = doc(firestore, "users", newuser.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: newuser.uid,
          displayName: newuser.displayName,
          email: newuser.email,
          photoURL: newuser.photoURL,
          createdAt: new Date(),
        });
      }
      console.log(newuser);

      setUser({
        uid: newuser.uid,
        displayName: newuser.displayName,
        email: newuser.email,
        photoURL: newuser.photoURL,
      });
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setAuthLoading(false);
    }
  };

  const actionLogout = async () => {
    try {
      await signOut(firebaseAuth);
      setTodos([]);
      setUser(null);
      console.log("User logged out");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const initializeAuth = () => {
    setAuthLoading(true);
    onAuthStateChanged(firebaseAuth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        todos,
        setTodos,
        actionLogin,
        actionLogout,
        authLoading,
        filterStatus,
        setFilterStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
