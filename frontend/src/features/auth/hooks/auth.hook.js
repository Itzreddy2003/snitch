import { register } from "../services/auth.api.js";
import { useDispatch } from "react-redux";
import { setUser } from "../state/auth.slice.js";

export const useAuth = () => {
  const dispatch = useDispatch();

  const handleRegister = async (email, fullname, contact, password,isSeller=false) => {
    const data = await register({ email, fullname, contact, password,isSeller });
    dispatch(setUser(data.user));
  };

  return { handleRegister };
};
