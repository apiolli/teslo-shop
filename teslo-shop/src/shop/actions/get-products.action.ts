import { tesloApi } from "@/api/teslo-api";
import type { ProductsResponse } from "@/types/products.response";

interface Options {
  limit?: number | string;
  offset?: number | string;
  sizes?: string;
  gender?: string;
}

export const getProductAction = async (
  options: Options,
): Promise<ProductsResponse> => {
  const { limit, offset, sizes, gender } = options;

  const { data } = await tesloApi.get<ProductsResponse>("/products", {
    params: {
      limit: limit,
      offset: offset,
      sizes: sizes,
      gender: gender,
    },
  });

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
