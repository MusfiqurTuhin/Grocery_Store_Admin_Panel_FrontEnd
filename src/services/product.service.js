import axios from "axios";

const baseApiUrl = "http://localhost:4000/v1";

export const createProduct = async (payload) => {
  const createProductEndpoint = `${baseApiUrl}/product`;

  const { data: apiResponse } = await axios.post(createProductEndpoint, payload);

  return apiResponse;
};

export const editProduct = async (productId, payload) => {
  const editProductEndpoint = `${baseApiUrl}/product/${productId}`;
  const { data: apiResponse } = await axios.put(editProductEndpoint, payload);

  return apiResponse;
};

export const retrieveProduct = async (productId) => {
  const getProductEndpoint = `${baseApiUrl}/product/${productId}`;
  const { data: apiResponse } = await axios.get(getProductEndpoint);

  return apiResponse;
};

export const retrieveAllProducts = async () => {
  const getAllProductsEndpoint = `${baseApiUrl}/product/all`;
  const { data: apiResponse } = await axios.get(getAllProductsEndpoint);

  return apiResponse;
};

export const removeProduct = async (productId) => {
  const removeProductEndpoint = `${baseApiUrl}/product/${productId}`;
  const { data: apiResponse } = await axios.delete(removeProductEndpoint);

  return apiResponse;
};
