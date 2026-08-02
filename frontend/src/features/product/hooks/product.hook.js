import { useDispatch } from "react-redux"

import { createProduct, getSellerProducts } from "../services/product.api.js"
import { setSellerProducts, setLoading, setError } from "../state/product.slice.js";
export const useProduct = () => {
    const dispatch = useDispatch();

    const handleCreateProduct = async (formData) => {
        dispatch(setLoading(true))
        try {
            const data = await createProduct(formData);
            return data;
        } catch (error) {
            dispatch(setError(error.message))
        } finally {
            dispatch(setLoading(false))
        }
    }

    const handleGetSellerProducts = async () => {
        dispatch(setLoading(true));
        try {
            const data = await getSellerProducts();
            dispatch(setSellerProducts(data));
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    };

    return { handleCreateProduct, handleGetSellerProducts };
}