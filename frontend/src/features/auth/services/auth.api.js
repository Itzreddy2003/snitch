import axios from "axios";

const apiInstance = axios.create({
  baseURL: "/api/auth",
  withCredentials: true,
});

export const getUserData = async()=>{
  const response = await apiInstance.get("/me");
  return response.data;
}
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

export const login = async ({ email, password }) => {
  const res = await apiInstance.post("/login", {
    email,
    password,
  });
  return res.data;
};
