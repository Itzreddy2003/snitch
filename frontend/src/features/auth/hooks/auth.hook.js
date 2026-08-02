import { getUserData, login, register } from "../services/auth.api.js";
import { useDispatch } from "react-redux";
import { setError, setLoading, setUser } from "../state/auth.slice.js";

export const useAuth = () => {
  const dispatch = useDispatch();

  const handleRegister = async (email, fullname, contact, password, isSeller = false) => {
    const data = await register({ email, fullname, contact, password, isSeller });
    dispatch(setUser(data.user));
  };

  const handleLogin = async (email, password) => {
    const data = await login({ email, password });
    dispatch(setUser(data.user));
  }


  const handlegetUserData = async () => {
    try {
      dispatch(setLoading(true));
      const data = await getUserData();
      dispatch(setUser(data))
      return data;
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }

  }

  return { handleRegister, handleLogin, handlegetUserData };
};

