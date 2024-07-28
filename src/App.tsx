import AuthLoading from "./components/shared/AuthLoading";
import Footer from "./components/shared/Footer";
import Header from "./components/shared/Header";
import Login from "./components/shared/Login";
import TodoApp from "./components/shared/TodoApp";
import { useApp } from "./context";

const App = () => {
  const { authLoading, user } = useApp();
  return (
    <>
      <Header />
      {authLoading && <AuthLoading />}
      {user ? <TodoApp /> : <Login />}
      <Footer />
    </>
  );
};

export default App;
