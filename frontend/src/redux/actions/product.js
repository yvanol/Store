import axios from "axios";
import { server } from "../../server";

// Create product
export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({ type: "productCreateRequest" });

    // Log FormData for debugging
    for (let [key, value] of newForm.entries()) {
      console.log(`FormData ${key}:`, value);
    }

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${server}/product/create-product`,
      newForm,
      config
    );

    dispatch({
      type: "productCreateSuccess",
      payload: data.product,
    });
  } catch (error) {
    console.error("Create Product Error:", error.response?.data);
    dispatch({
      type: "productCreateFail",
      payload: error.response?.data?.message || "Failed to create product",
    });
  }
};

// Get all products of a shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getAllProductsShopRequest" });

    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`
    );
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data.products,
    });
  } catch (error) {
    console.error("Get All Products Shop Error:", error.response?.data);
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error.response?.data?.message || "Failed to fetch shop products",
    });
  }
};

// Delete product of a shop
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteProductRequest" });

    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      { withCredentials: true }
    );

    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    console.error("Delete Product Error:", error.response?.data);
    dispatch({
      type: "deleteProductFailed",
      payload: error.response?.data?.message || "Failed to delete product",
    });
  }
};

// Update product
export const updateProduct = (productId, updatedForm) => async (dispatch) => {
  try {
    dispatch({ type: "updateProductRequest" });

    const formData = new FormData();
    for (const key in updatedForm) {
      if (key === "images" && updatedForm.images) {
        Array.from(updatedForm.images).forEach((image) => {
          formData.append("images", image);
        });
      } else {
        formData.append(key, updatedForm[key] || "");
      }
    }

    // Log FormData for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`Update FormData ${key}:`, value);
    }

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(
      `${server}/product/update-product/${productId}`,
      formData,
      config
    );

    dispatch({
      type: "updateProductSuccess",
      payload: data.product,
    });
  } catch (error) {
    console.error("Update Product Error:", error.response?.data);
    dispatch({
      type: "updateProductFail",
      payload: error.response?.data?.message || "Failed to update product",
    });
  }
};

// Get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllProductsRequest" });

    const { data } = await axios.get(`${server}/product/get-all-products`);
    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    console.error("Get All Products Error:", error.response?.data);
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response?.data?.message || "Failed to fetch products",
    });
  }
};