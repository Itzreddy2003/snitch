import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export const register = async ({
  email,
  fullname,
  password,
  contact,
  isSeller,
}) => {
  const res = await apiInstance.post("/register", {
    email,
    fullname,
    password,
    contact,
    isSeller,
  });

  return res.data;
};
