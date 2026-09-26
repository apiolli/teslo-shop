import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductByIdAction } from "../actions/get-product-byId.action";
import type { Product } from "@/types/product.interface";
import { createUpdateProducAction } from "../actions/create-update-product.action";

export const useProduct = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["product", { id }],
    queryFn: () => getProductByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: createUpdateProducAction,
    onSuccess: (product: Product) => {
      console.log("Todo salio bien", product);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({
        queryKey: ["product", { id: product.id }],
      });
      queryClient.setQueryData(["products", { id: product.id }], product);
    },
  });

  // const handleSubmitForm = async (productLike: Partial<Product>) => {
  //   console.log({ productLike });
  // };

  return {
    ...query,
    mutation,
  };
};
