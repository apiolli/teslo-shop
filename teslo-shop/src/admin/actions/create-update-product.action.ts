import { tesloApi } from "@/api/teslo-api";
import type { Product } from "@/types/product.interface";

export const createUpdateProducAction = async (
  productLike: Partial<Product>,
): Promise<Product> => {
  const { id, user, images = [], ...rest } = productLike;

  const isCreating = id === "new";

  rest.stock = Number(rest.stock) || 0;
  rest.price = Number(rest.price) || 0;

  const { data } = await tesloApi<Product>({
    url: isCreating ? "/products" : `/products/${id}`,
    method: isCreating ? "POST" : "PATCH",
    data: rest,
  });

  return {
    ...data,
    images: data.images.map((img) => {
      if (img.includes("http")) return img;
      return `${import.meta.env.VITE_API_URL}/files/products/${img}`;
    }),
  };
};
