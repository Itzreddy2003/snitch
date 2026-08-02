import "./App.css";
import { RouterProvider } from "react-router";
import { routes } from "./app.routes";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useAuth } from "../features/auth/hooks/auth.hook";
const App = () => {
  const { handlegetUserData } = useAuth();
  const {user} = useSelector(state => state.auth)
  console.log(user);

  useEffect(() => {
    async function fetchUserData() {
      await handlegetUserData()
    }
    fetchUserData();
  }, [])
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
};

export default App;
