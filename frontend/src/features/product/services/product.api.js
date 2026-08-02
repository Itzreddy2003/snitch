import axios from "axios";

const apiInstance = axios.create({
    baseURL : "/api/products",
    withCredentials : true
})

export const createProduct = async(formData)=>{
    const response = await apiInstance.post("/create",formData)
    return response.data
}

export const getSellerProducts = async()=>{
    const response = await apiInstance.get("/")
    return response.data;
}