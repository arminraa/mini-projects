import { useMutation } from "@tanstack/react-query";
import { addTaskServer, EditTaskServer, removeTaskServer } from "./api";
import { Task, useTodoStore } from "./store";

export const useAddTask = () => {
  const addTask = useTodoStore((state) => state.addTask);
  return useMutation({
    mutationFn: ({
      title,
      description,
    }: {
      title: string;
      description: string;
    }) => addTaskServer(title, description),
    onSuccess: (data, variables) =>
      addTask(data.id, variables.title, variables.description),
  });
};

export const useEditTask = () => {
  const editTask = useTodoStore((state) => state.editTask);
  return useMutation({
    mutationFn: ({
      draggedTask,
      newType,
    }: {
      draggedTask: Task;
      newType: "New" | "In Progress" | "Completed";
    }) => EditTaskServer(draggedTask, newType),
    onSuccess: (_, variables) =>
      editTask(variables.draggedTask.id, variables.newType),
  });
};

export const useRemoveTask = () => {
  const removeTask = useTodoStore((state) => state.removeTask);
  return useMutation({
    mutationFn: (id: string) => removeTaskServer(id),
    onSuccess: (_, variables) => {
      removeTask(variables);
    },
  });
};
