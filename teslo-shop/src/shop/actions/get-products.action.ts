import { tesloApi } from "@/api/teslo-api";
import type { ProductsResponse } from "@/types/products.response";

export const getProductAction = async (): Promise<ProductsResponse> => {
  const { data } = await tesloApi.get<ProductsResponse>("/products");

  const productsWithImageUrls = data.products.map((p) => ({
    ...p,
    images: p.images.map(
      (image) => `${import.meta.env.VITE_API_URL}/files/product/${image}`,
    ),
  }));

  return {
    ...data,
    products: productsWithImageUrls,
  };
};
