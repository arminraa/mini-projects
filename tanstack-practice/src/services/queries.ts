import {
  keepPreviousData,
  useInfiniteQuery,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getComments,
  getProduct,
  getProducts,
  getTodos,
  getTodosIds,
} from "./api";
import { Comment } from "../types/comments";

export function useTodosIds(status: "enabled" | "disabled") {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodosIds,
    // refetchOnWindowFocus: false,
    enabled: status === "enabled" ? true : false,
  });
}

export function useTodos(ids: (string | undefined)[] | undefined) {
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ["todo", { id }],
        queryFn: () => getTodos(id!),
      };
    }),
  });
}

export function useComments(page: number) {
  return useQuery({
    queryKey: ["comments", { page }],
    queryFn: () => getComments(page),
    placeholderData: keepPreviousData,
  });
}

export function useProducts() {
  return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    initialPageParam: 0,
    getNextPageParam: (_, allPages, lastPageParam) => {
      if (allPages.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (_, allPages, firstPageParam) => {
      if (allPages.length === 0) {
        return undefined;
      }
      return firstPageParam - 1;
    },
  });
}

export function useProduct(id: number | null) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["product", { id }],
    queryFn: () => getProduct(id!),
    enabled: !!id, 
    placeholderData: () => {
      const cachedProducts = (
        queryClient.getQueryData(["products"]) as {
          pages: Comment[] | undefined;
        }
      )?.pages?.flat(2);

      if (cachedProducts) {
        return cachedProducts.find((item) => item.id === id);
      }
    },
  });
}
