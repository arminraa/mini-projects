import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Task = {
  id: string;
  title: string;
  description: string;
  type: string;
};

export type State = {
  tasks: Task[];
  draggedTask: Task | null;
};

export type Action = {
  addTask: (id: string, title: string, description: string) => void;
  removeTask: (id: string) => void;
  dragTask: (id: string) => void;
  editTask: (id: string, type: string) => void;
};

export const useTodoStore = create<Action & State>()(
  persist(
    (set) => ({
      tasks: [],
      draggedTask: null,
      addTask: (id: string, title: string, description: string) =>
        set((state) => ({
          tasks: [...state.tasks, { id, title, description, type: "New" }],
        })),

      removeTask: (id: string) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      dragTask: (id: string) =>
        set((state) => ({
          draggedTask: state.tasks.find((task) => task.id === id),
        })),
      editTask: (id: string, type: string) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { id, title: task.title, description: task.description, type }
              : task
          ),
        })),
    }),
    {
      name: "Todo-Storge", // name of the item in the storage (must be unique)
      // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
