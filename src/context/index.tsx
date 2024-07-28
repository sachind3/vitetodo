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
});

export const AppState = ({ children }: { children: ReactNode }) => {
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  const actionLogin = async () => {
    try {
      setAuthLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(firebaseAuth, provider);
      const user = result.user;
      const userRef = doc(firestore, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date(),
        });
      }
      setUser({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
