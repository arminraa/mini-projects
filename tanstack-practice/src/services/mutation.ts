import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../types/todos";
import { createTodo, deleteTodo, updateTodo } from "./api";

export function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (todo: Todo) => createTodo(todo),
    onMutate: () => {
      console.log("Mutate");
    },
    onError: () => {
      console.log("Error");
    },
    onSuccess: () => {
      console.log("Success");
    },
    onSettled: async (data, error, variables) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
        console.log(variables);
        console.log(data);
      }
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (todo: Todo) => updateTodo(todo),
    onSettled: (_, error, variables) => {
      if (error) {
        console.error(error);
      } else {
        // queryClient.invalidateQueries({ queryKey: ["todos"] });
        queryClient.invalidateQueries({
          queryKey: ["todo", { id: variables.id }],
        });
      }
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      console.log("Success");
    },
    onError: () => {
      console.error("Error");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
}
